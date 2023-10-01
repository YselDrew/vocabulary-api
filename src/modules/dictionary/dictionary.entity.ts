import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('dictionaries')
export class Dictionary {
  @PrimaryGeneratedColumn('uuid', {
    name: 'dictionary_id',
  })
  dictionaryId: string;

  @Column({
    name: 'dictionary_name',
    type: 'varchar',
    length: 100,
    nullable: false,
  })
  dictionaryName: string;

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
