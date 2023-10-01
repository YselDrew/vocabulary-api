import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('languages')
export class Language {
  @PrimaryGeneratedColumn('uuid', {
    name: 'language_id',
  })
  languageId: string;

  @Column({
    name: 'language_name',
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  languageName: string;
}
