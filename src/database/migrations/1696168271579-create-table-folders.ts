import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableFolders1696168271579 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
      CREATE TABLE folders (
        folder_id       UUID            NOT NULL    DEFAULT uuid_generate_v4(),
        vocabulary_id   UUID            NOT NULL,
        folder_name     VARCHAR(255)    NOT NULL,
        description     TEXT            NULL,
        created_at      TIMESTAMPTZ     NOT NULL,
        CONSTRAINT folders_pk 
          PRIMARY KEY (folder_id),
				CONSTRAINT folders_vocabulary_id_fk 
          FOREIGN KEY (vocabulary_id) 
            REFERENCES vocabularies(vocabulary_id) ON DELETE CASCADE
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query('DROP TABLE folders');
  }
}
