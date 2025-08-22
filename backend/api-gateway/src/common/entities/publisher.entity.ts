import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Publisher {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ type: 'int' })
  establishedYear: number;
}
