import { Test, TestingModule } from '@nestjs/testing';
import { ProfesorService } from './profesor.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Profesor } from './entities/profesor.entity';
import { Repository } from 'typeorm';

describe('ProfesorService', () => {
  let service: ProfesorService;
  let repo: Repository<Profesor>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProfesorService,
        {
          provide: getRepositoryToken(Profesor),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<ProfesorService>(ProfesorService);
    repo = module.get<Repository<Profesor>>(getRepositoryToken(Profesor));
  });

  it('debe crear profesor con extensión válida (positivo)', async () => {
    const dto = {
      cedula: 123,
      nombre: 'Profe',
      departamento: 'Ciencias',
      extension: 54321,
    };

    jest.spyOn(repo, 'save').mockResolvedValue(dto as Profesor);

    const result = await service.crearProfesor(dto);
    expect(result).toEqual(dto);
  });

  it('debe fallar si extensión no tiene 5 dígitos (negativo)', async () => {
    const dto = {
      cedula: 123,
      nombre: 'Profe',
      departamento: 'Ciencias',
      extension: 123, // solo 3 dígitos
    };

    await expect(service.crearProfesor(dto)).rejects.toThrow(
      'La extensión debe tener exactamente 5 dígitos',
    );
  });

  it('debe asignar evaluador si tiene < 3 evaluaciones activas (positivo)', async () => {
    const profesor = {
      id: 1,
      evaluaciones: [{ proyecto: { estado: 4 } }, { proyecto: { estado: 4 } }],
    } as unknown as Profesor;

    jest.spyOn(repo, 'findOne').mockResolvedValue(profesor);
    jest.spyOn(repo, 'save').mockResolvedValue(profesor);

    const result = await service.asignarEvaluador(1);
    expect(result).toBe('Evaluador asignado');
  });

  it('debe fallar si tiene 3 evaluaciones activas (negativo)', async () => {
    const profesor = {
      id: 1,
      evaluaciones: [
        { proyecto: { estado: 1 } },
        { proyecto: { estado: 2 } },
        { proyecto: { estado: 3 } },
      ],
    } as unknown as Profesor;

    jest.spyOn(repo, 'findOne').mockResolvedValue(profesor);

    await expect(service.asignarEvaluador(1)).rejects.toThrow(
      'Este profesor ya tiene 3 evaluaciones activas',
    );
  });
});
