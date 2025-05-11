import { MigrationInterface, QueryRunner } from 'typeorm';

export class typeToCategory1746946976255 implements MigrationInterface {
  name = 'typeToCategory1746946976255';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE mentions CHANGE category type ENUM('chat', 'dm', 'system')`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE mentions CHANGE type category ENUM('chat', 'dm', 'system')`);
  }
}
