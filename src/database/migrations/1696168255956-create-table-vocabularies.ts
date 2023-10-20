import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableVocabularies1696168255956 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
			CREATE TABLE vocabularies (
				vocabulary_id 				UUID 						NOT NULL		DEFAULT uuid_generate_v4(),
				vocabulary_name 			VARCHAR(100) 		NOT NULL,
				description						TEXT						NULL,
				native_language_id 		UUID 						NOT NULL,
				learn_language_id 		UUID 						NOT NULL,
				CONSTRAINT vocabularies_pk 
					PRIMARY KEY (vocabulary_id),
				CONSTRAINT vocabularies_native_language_id_fk 
					FOREIGN KEY (native_language_id) 
						REFERENCES languages(language_id) ON DELETE CASCADE,
				CONSTRAINT vocabularies_learn_language_id_fk 
					FOREIGN KEY (learn_language_id) 
						REFERENCES languages(language_id) ON DELETE CASCADE
			);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE vocabularies');
  }
}
