// src/database/entities/iim-admission-model.entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('iim_admission_models') // Optional: specify table name
export class IIMAdmissionModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  iimName: string;

  @Column()
  year: number;

  @Column()
  dataSource: string;
}