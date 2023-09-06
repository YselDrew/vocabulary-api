import { MigrationInterface, QueryRunner } from 'typeorm';
import 'dotenv/config';

export class CreateExtensionUuidOssp1694032244143 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');

    // It's possible to setup schema name here as well
    // to avoid using schema name in each migraiton
  }

  public async down(): Promise<void> {}
}
