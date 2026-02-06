import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('historical_cutoffs') // Optional: specify table name
export class HistoricalCutoff {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  iimId: number;

  @Column()
  year: number;

  @Column()
  compositeCutoff: number;

  @Column()
  category: string;
}