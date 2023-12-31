import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableWords1696168271581 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE words (
        word_id           UUID            NOT NULL    DEFAULT uuid_generate_v4(),
        folder_id         UUID            NOT NULL,
        word              VARCHAR(255)    NOT NULL,
        translation       VARCHAR(255)    NOT NULL,
        example           TEXT            NULL,
        created_at        TIMESTAMPTZ     NOT NULL    DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT words_pk 
          PRIMARY KEY (word_id),
				CONSTRAINT words_folder_id_fk 
          FOREIGN KEY (folder_id) 
            REFERENCES folders(folder_id) ON DELETE CASCADE
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE words');
  }
}
