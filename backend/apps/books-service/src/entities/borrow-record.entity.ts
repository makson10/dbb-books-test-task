import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Book } from './book.entity';
import { User } from './user.entity';

@Entity()
export class BorrowRecord {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  bookId: number;

  @Column({ type: 'int' })
  borrowerId: number;

  @Column({ type: 'timestamptz', default: new Date() })
  borrowedAt: Date;

  @Column({ type: 'timestamptz', nullable: true })
  returnedAt: Date | null;

  @ManyToOne(() => Book)
  book: Book;

  @ManyToOne(() => User)
  borrower: User;
}
