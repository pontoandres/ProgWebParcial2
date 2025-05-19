import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Evaluacion } from './entities/evaluacion.entity';
import { CreateEvaluacionDto } from './dto/create-evaluacion.dto';

@Injectable()
export class EvaluacionService {
  constructor(
    @InjectRepository(Evaluacion)
    private evaluacionRepository: Repository<Evaluacion>,
  ) {}

  async crearEvaluacion(dto: CreateEvaluacionDto): Promise<Evaluacion> {
    if (dto.evaluadorId === dto.mentorId) {
      throw new Error('El evaluador no puede ser el mentor');
    }

    if (dto.calificacion < 0 || dto.calificacion > 5) {
      throw new Error('La calificación debe estar entre 0 y 5');
    }

    const evaluacion = this.evaluacionRepository.create({
      calificacion: dto.calificacion,
      evaluador: { id: dto.evaluadorId },
      mentor: { id: dto.mentorId },
      proyecto: { id: dto.proyectoId },
    });

    return this.evaluacionRepository.save(evaluacion);
  }
}
