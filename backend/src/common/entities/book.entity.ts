import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  RelationId,
  JoinColumn,
} from 'typeorm';
import { Publisher } from './publisher.entity';
import { Author } from './author.entity';
import { Genre } from './genre.entity';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  isbn: string;

  @Column({ type: 'date' })
  publishDate: Date;

  @Column({ type: 'int' })
  copiesTotal: number;

  @Column({ type: 'int' })
  copiesAvailable: number;

  @ManyToOne(() => Publisher)
  @JoinColumn({ name: 'publisherId' })
  publisher: Publisher;

  @RelationId((book: Book) => book.publisher)
  publisherId: number;

  @ManyToMany(() => Author)
  @JoinTable({ name: 'book_authors' })
  authors: Author[];

  @ManyToMany(() => Genre)
  @JoinTable({ name: 'book_genres' })
  genres: Genre[];
}
