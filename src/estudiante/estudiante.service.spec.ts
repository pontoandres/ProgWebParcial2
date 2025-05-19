import { Test, TestingModule } from '@nestjs/testing';
import { EstudianteService } from './estudiante.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Estudiante } from './entities/estudiante.entity';
import { Repository } from 'typeorm';

describe('EstudianteService', () => {
  let service: EstudianteService;
  let repo: Repository<Estudiante>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EstudianteService,
        {
          provide: getRepositoryToken(Estudiante),
          useClass: Repository, // usamos la clase Repository como mock base
        },
      ],
    }).compile();

    service = module.get<EstudianteService>(EstudianteService);
    repo = module.get<Repository<Estudiante>>(getRepositoryToken(Estudiante));
  });

  it('debe crear un estudiante válido (caso positivo)', async () => {
    const dto = {
      cedula: 123,
      nombre: 'Ana',
      semestre: 6,
      programa: 'Ingeniería',
      promedio: 3.8,
    };

    jest.spyOn(repo, 'save').mockResolvedValue(dto as Estudiante);

    const result = await service.crearEstudiante(dto);
    expect(result).toEqual(dto);
  });

  it('debe lanzar error si promedio < 3.2 o semestre < 4 (caso negativo)', async () => {
    const dto = {
      cedula: 456,
      nombre: 'Juan',
      semestre: 2,
      programa: 'Medicina',
      promedio: 2.9,
    };

    await expect(service.crearEstudiante(dto)).rejects.toThrow(
      'Estudiante no cumple con los requisitos',
    );
  });

  it('debe eliminar estudiante sin proyectos activos (caso positivo)', async () => {
    const estudiante = {
      id: 1,
      proyectos: [{ estado: 4 }],
    } as Estudiante;

    jest.spyOn(repo, 'findOne').mockResolvedValue(estudiante);
    jest.spyOn(repo, 'remove').mockResolvedValue(estudiante);

    await expect(service.eliminarEstudiante(1)).resolves.toBeUndefined();
  });

  it('debe lanzar error si tiene proyectos activos (caso negativo)', async () => {
    const estudiante = {
      id: 2,
      proyectos: [{ estado: 2 }],
    } as Estudiante;

    jest.spyOn(repo, 'findOne').mockResolvedValue(estudiante);

    await expect(service.eliminarEstudiante(2)).rejects.toThrow(
      'Tiene proyectos activos',
    );
  });
});
