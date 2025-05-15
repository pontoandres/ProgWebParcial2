import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Estudiante } from './entities/estudiante.entity';
import { CreateEstudianteDto } from './dto/create-estudiante.dto';

@Injectable()
export class EstudianteService {
  constructor(
    @InjectRepository(Estudiante)
    private estudianteRepository: Repository<Estudiante>,
  ) {}

  async crearEstudiante(dto: CreateEstudianteDto): Promise<Estudiante> {
    if (dto.promedio <= 3.2 || dto.semestre < 4) {
      throw new Error('Estudiante no cumple con los requisitos');
    }
    return this.estudianteRepository.save(dto);
  }

  async eliminarEstudiante(id: number): Promise<void> {
    const estudiante = await this.estudianteRepository.findOne({
      where: { id },
      relations: ['proyectos'],
    });

    if (!estudiante) throw new Error('Estudiante no encontrado');

    const tieneActivos = estudiante.proyectos.some(p => p.estado < 4);
    if (tieneActivos) throw new Error('Tiene proyectos activos');

    await this.estudianteRepository.remove(estudiante);
  }
}
