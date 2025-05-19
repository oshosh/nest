import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { ChannelMembers } from 'src/entities/ChannelMembers';
import { Users } from 'src/entities/Users';
import { WorkspaceMembers } from 'src/entities/WorkspaceMembers';
import { DataSource, Repository } from 'typeorm';
import { JoinRequestDto } from './dto/join.request.dto';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users) private usersRepository: Repository<Users>,
    @InjectRepository(WorkspaceMembers)
    private workspacesMembersRepository: Repository<WorkspaceMembers>,
    @InjectRepository(ChannelMembers)
    private channelMembersRepository: Repository<ChannelMembers>,
    private dataSource: DataSource,
  ) {}

  async join(JoinRequestDto: JoinRequestDto) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    const { nickname, email, password } = JoinRequestDto;

    const user = await queryRunner.manager.getRepository(Users).findOne({ where: { email } });
    if (user) {
      throw new UnauthorizedException('이미 존재하는 사용자입니다.');
    }

    try {
      const hashedPassword = await bcrypt.hash(password, 12);
      const returnUser = await queryRunner.manager.getRepository(Users).save({
        nickname,
        email,
        password: hashedPassword,
      });

      const workspaceMember = new WorkspaceMembers(); // this.workspacesMembersRepository.create()
      workspaceMember.UserId = returnUser.id;
      workspaceMember.WorkspaceId = 1;

      await queryRunner.manager.getRepository(WorkspaceMembers).save(workspaceMember);

      await queryRunner.manager.getRepository(ChannelMembers).save({
        UserId: returnUser.id,
        ChannelId: 1,
      });

      await queryRunner.commitTransaction();
      return true;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}
