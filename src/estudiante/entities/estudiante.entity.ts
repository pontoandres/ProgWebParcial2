/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

import { Proyecto } from '../../proyecto/entities/proyecto.entity';

@Entity()
export class Estudiante {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  cedula: number;

  @Column()
  nombre: string;

  @Column()
  semestre: number;

  @Column()
  programa: string;

  @Column('float')
  promedio: number;

  @OneToMany(() => Proyecto, proyecto => proyecto.lider)
  proyectos: Proyecto[];
}
