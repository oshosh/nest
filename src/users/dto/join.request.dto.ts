import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Users } from 'src/entities/Users';
export class JoinRequestDto extends PickType(Users, ['email', 'nickname', 'password'] as const) {
  @IsEmail({}, { message: '올바른 이메일 형식이 아닙니다.' })
  @ApiProperty({
    example: 'abc1234@gmail.com',
    description: '이메일',
  })
  public email: string;

  @IsString({ message: '닉네임은 문자열이어야 합니다.' })
  @IsNotEmpty({ message: '닉네임을 입력해주세요.' })
  @ApiProperty({
    example: '닉네임',
    description: '닉네임',
  })
  public nickname: string;

  @IsString({ message: '비밀번호는 문자열이어야 합니다.' })
  @IsNotEmpty({ message: '비밀번호를 입력해주세요.' })
  @ApiProperty({
    example: '1234567**',
    description: '비밀번호',
  })
  public password: string;
}
