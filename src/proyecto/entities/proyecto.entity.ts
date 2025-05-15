/* eslint-disable prettier/prettier */
import {
  Entity, PrimaryGeneratedColumn, Column,
  ManyToOne, OneToMany
} from 'typeorm';
import { Estudiante } from '../../estudiante/entities/estudiante.entity';
import { Profesor } from '../../profesor/entities/profesor.entity';
import { Evaluacion } from '../../evaluacion/entities/evaluacion.entity';

@Entity()
export class Proyecto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  titulo: string;

  @Column()
  area: string;

  @Column()
  presupuesto: number;

  @Column()
  notaFinal: number;

  @Column()
  estado: number;

  @Column()
  fechaInicio: string;

  @Column()
  fechaFin: string;

  @ManyToOne(() => Estudiante, estudiante => estudiante.proyectos)
  lider: Estudiante;

  @ManyToOne(() => Profesor, profesor => profesor.mentorias)
  mentor: Profesor;

  @OneToMany(() => Evaluacion, evaluacion => evaluacion.proyecto)
  evaluaciones: Evaluacion[];
}
