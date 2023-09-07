import { MigrationInterface, QueryRunner } from 'typeorm';
import 'dotenv/config';

const { DB_NAME, DB_SCHEMA} = process.env;

export class CreateExtensionUuidOssp1694032244143 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
  }

  public async down(): Promise<void> {}
}
