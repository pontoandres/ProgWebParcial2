/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profesor } from './entities/profesor.entity';
import { CreateProfesorDto } from './dto/create-profesor.dto';

@Injectable()
export class ProfesorService {
  constructor(
    @InjectRepository(Profesor)
    private profesorRepository: Repository<Profesor>,
  ) {}

  async crearProfesor(dto: CreateProfesorDto): Promise<Profesor> {
    if (dto.extension.toString().length !== 5) {
      throw new Error('La extensión debe tener exactamente 5 dígitos');
    }
    return this.profesorRepository.save(dto);
  }

  async asignarEvaluador(id: number): Promise<string> {
    const profesor = await this.profesorRepository.findOne({
      where: { id },
      relations: ['evaluaciones', 'evaluaciones.proyecto'],
    });

    if (!profesor) throw new Error('Profesor no encontrado');

    const activas = profesor.evaluaciones.filter(e => e.proyecto.estado < 4).length;
    if (activas >= 3) {
      throw new Error('Este profesor ya tiene 3 evaluaciones activas');
    }

    profesor.esParEvaluador = true;
    await this.profesorRepository.save(profesor);
    return 'Evaluador asignado';
  }
}
