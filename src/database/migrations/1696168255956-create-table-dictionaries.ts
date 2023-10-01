import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableDictionaries1696168255956 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
			CREATE TABLE dictionaries (
				dictionary_id 				UUID 						NOT NULL		DEFAULT uuid_generate_v4(),
				dictionary_name 			VARCHAR(100) 		NOT NULL,
				native_language_id 		UUID 						NOT NULL,
				learn_language_id 		UUID 						NOT NULL,
				CONSTRAINT dictionaries_pk 
					PRIMARY KEY (dictionary_id),
				CONSTRAINT dictionaries_native_language_id_fk 
					FOREIGN KEY (native_language_id) 
						REFERENCES languages(language_id) ON DELETE CASCADE,
				CONSTRAINT dictionaries_learn_language_id_fk 
					FOREIGN KEY (learn_language_id) 
						REFERENCES languages(language_id) ON DELETE CASCADE
			);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE dictionaries');
  }
}
