/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Proyecto } from './entities/proyecto.entity';
import { CreateProyectoDto } from './dto/create-proyecto.dto';
import { Estudiante } from '../estudiante/entities/estudiante.entity';

@Injectable()
export class ProyectoService {
  constructor(
    @InjectRepository(Proyecto)
    private proyectoRepository: Repository<Proyecto>,
  ) {}

  async crearProyecto(dto: CreateProyectoDto): Promise<Proyecto> {
    if (dto.presupuesto <= 0 || dto.titulo.length <= 15) {
      throw new Error('Presupuesto debe ser > 0 y título > 15 caracteres');
    }

    const proyecto = this.proyectoRepository.create({
      ...dto,
      lider: { id: dto.lider },
      mentor: { id: dto.mentor },
    });

    return this.proyectoRepository.save(proyecto);
  }

  async avanzarProyecto(id: number): Promise<Proyecto> {
    const proyecto = await this.proyectoRepository.findOne({ where: { id } });
    if (!proyecto) throw new Error('Proyecto no encontrado');

    if (proyecto.estado >= 4) {
      throw new Error('Proyecto ya en estado máximo');
    }

    proyecto.estado += 1;
    return this.proyectoRepository.save(proyecto);
  }

  async findAllEstudiantes(id: number): Promise<Estudiante[]> {
    const proyecto = await this.proyectoRepository.findOne({
      where: { id },
      relations: ['lider'],
    });

    if (!proyecto) throw new Error('Proyecto no encontrado');
    return [proyecto.lider];
  }
}
