import { MigrationInterface, QueryRunner } from 'typeorm';
import 'dotenv/config';

export class CreateTableLanguages1694032244144 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE languages (
        language_id     UUID            NOT NULL    DEFAULT uuid_generate_v4(),
        language_name   VARCHAR(255)    NOT NULL,
        CONSTRAINT languages_pk 
          PRIMARY KEY (language_id)
      );
    `);

    await queryRunner.query(`
      INSERT INTO languages (language_name)
      VALUES 
        ('Ukrainian'),
        ('English'),
        ('Spanish'),
        ('Portuguese'),
        ('Italian'),
        ('Germany'),
        ('French'),
        ('Polish'),
        ('Turkish'),
        ('Arabic'),
        ('Hindi'),
        ('Chinese'),
        ('Korean'),
        ('Japanese');
      `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE languages');
  }
}
