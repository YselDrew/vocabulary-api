import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('vocabularies')
export class Vocabulary {
  @PrimaryGeneratedColumn('uuid', {
    name: 'vocabulary_id',
  })
  vocabularyId: string;

  @Column({
    name: 'vocabulary_name',
    type: 'varchar',
    length: 100,
    nullable: false,
  })
  vocabularyName: string;

  @Column({
    name: 'native_language_id',
    type: 'uuid',
    nullable: false,
  })
  nativeLanguageId: string;

  @Column({
    name: 'learn_language_id',
    type: 'uuid',
    nullable: false,
  })
  learnLanguageId: string;
}
