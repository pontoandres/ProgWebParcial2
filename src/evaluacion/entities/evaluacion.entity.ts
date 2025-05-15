/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { Proyecto } from '../../proyecto/entities/proyecto.entity';
import { Profesor } from '../../profesor/entities/profesor.entity';

@Entity()
export class Evaluacion {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Proyecto, proyecto => proyecto.evaluaciones)
  proyecto: Proyecto;

  @ManyToOne(() => Profesor, profesor => profesor.evaluaciones)
  evaluador: Profesor;

  @ManyToOne(() => Profesor)
  mentor: Profesor;

  @Column()
  calificacion: number;
}
