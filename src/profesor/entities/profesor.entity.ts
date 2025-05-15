/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Proyecto } from '../../proyecto/entities/proyecto.entity';
import { Evaluacion } from '../../evaluacion/entities/evaluacion.entity';

@Entity()
export class Profesor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  cedula: number;

  @Column()
  nombre: string;

  @Column()
  departamento: string;

  @Column()
  extension: number;

  @Column()
  esParEvaluador: boolean;

  @OneToMany(() => Proyecto, proyecto => proyecto.mentor)
  mentorias: Proyecto[];

  @OneToMany(() => Evaluacion, evaluacion => evaluacion.evaluador)
  evaluaciones: Evaluacion[];
}
