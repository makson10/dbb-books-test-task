import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Book } from './book.entity';

@Entity()
export class Author {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  fullName: string;

  @Column({ type: 'date' })
  birthDate: Date;

  @ManyToMany(() => Book, (book) => book.authors)
  @JoinTable({ name: 'book_authors' })
  books: Book[];
}
