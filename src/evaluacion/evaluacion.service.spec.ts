import { Test, TestingModule } from '@nestjs/testing';
import { EvaluacionService } from './evaluacion.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Evaluacion } from './entities/evaluacion.entity';
import { Repository } from 'typeorm';

describe('EvaluacionService', () => {
  let service: EvaluacionService;
  let repo: Repository<Evaluacion>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EvaluacionService,
        {
          provide: getRepositoryToken(Evaluacion),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<EvaluacionService>(EvaluacionService);
    repo = module.get<Repository<Evaluacion>>(getRepositoryToken(Evaluacion));
  });

  it('debe crear una evaluación válida (positivo)', async () => {
    const dto = {
      evaluadorId: 1,
      mentorId: 2,
      proyectoId: 3,
      calificacion: 4.5,
    };

    const expected = {
      calificacion: dto.calificacion,
      evaluador: { id: dto.evaluadorId },
      mentor: { id: dto.mentorId },
      proyecto: { id: dto.proyectoId },
    };

    jest.spyOn(repo, 'create').mockReturnValue(expected as Evaluacion);
    jest.spyOn(repo, 'save').mockResolvedValue(expected as Evaluacion);

    const result = await service.crearEvaluacion(dto);
    expect(result).toEqual(expected);
  });

  it('debe fallar si evaluador y mentor son iguales (negativo)', async () => {
    const dto = {
      evaluadorId: 1,
      mentorId: 1,
      proyectoId: 3,
      calificacion: 4,
    };

    await expect(service.crearEvaluacion(dto)).rejects.toThrow(
      'El evaluador no puede ser el mentor',
    );
  });

  it('debe fallar si calificación es inválida (negativo)', async () => {
    const dto = {
      evaluadorId: 1,
      mentorId: 2,
      proyectoId: 3,
      calificacion: 6,
    };

    await expect(service.crearEvaluacion(dto)).rejects.toThrow(
      'La calificación debe estar entre 0 y 5',
    );
  });
});
