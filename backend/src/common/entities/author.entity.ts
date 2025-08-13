import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Book } from './book.entity';

@Entity()
export class Author {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fullName: string;

  @Column({ type: 'date' })
  birthDate: Date;

  @ManyToMany(() => Book, (book) => book.authors)
  books: Book[];
}
