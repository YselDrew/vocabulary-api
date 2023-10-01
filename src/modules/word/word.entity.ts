import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('words')
export class Word {
  @PrimaryGeneratedColumn('uuid', {
    name: 'word_id',
  })
  wordId: string;

  @Column({
    name: 'dictionary_id',
    type: 'uuid',
    nullable: false,
  })
  dictionaryId: string;

  @Column({
    name: 'word',
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  word: string;

  @Column({
    name: 'translation',
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  translation: string;

  @Column({
    name: 'example',
    type: 'text',
    nullable: true,
  })
  example: null | string;

  @CreateDateColumn()
  createdAt: string;
}
