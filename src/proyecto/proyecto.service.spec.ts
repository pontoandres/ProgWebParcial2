import { Test, TestingModule } from '@nestjs/testing';
import { ProyectoService } from './proyecto.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Proyecto } from './entities/proyecto.entity';
import { Repository } from 'typeorm';

describe('ProyectoService', () => {
  let service: ProyectoService;
  let repo: Repository<Proyecto>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProyectoService,
        {
          provide: getRepositoryToken(Proyecto),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<ProyectoService>(ProyectoService);
    repo = module.get<Repository<Proyecto>>(getRepositoryToken(Proyecto));
  });

  it('debe crear un proyecto válido (positivo)', async () => {
    const dto = {
      titulo: 'Proyecto muy importante y extenso',
      area: 'Ciencias',
      presupuesto: 10000,
      notaFinal: 4.5,
      estado: 0,
      fechaInicio: '2024-01-01',
      fechaFin: '2024-12-31',
      lider: 1,
      mentor: 2,
    };

    const esperado = {
      ...dto,
      lider: { id: dto.lider },
      mentor: { id: dto.mentor },
    };

    jest.spyOn(repo, 'create').mockReturnValue(esperado as Proyecto);
    jest.spyOn(repo, 'save').mockResolvedValue(esperado as Proyecto);

    const result = await service.crearProyecto(dto);
    expect(result).toEqual(esperado);
  });

  it('debe fallar si presupuesto es 0 o título es muy corto (negativo)', async () => {
    const dto = {
      titulo: 'Corto',
      area: 'Ciencias',
      presupuesto: 0,
      notaFinal: 4,
      estado: 0,
      fechaInicio: '2024-01-01',
      fechaFin: '2024-12-31',
      lider: 1,
      mentor: 2,
    };

    await expect(service.crearProyecto(dto)).rejects.toThrow(
      'Presupuesto debe ser > 0 y título > 15 caracteres',
    );
  });

  it('debe avanzar el estado si no ha llegado al máximo (positivo)', async () => {
    const proyecto = {
      id: 1,
      estado: 2,
    } as Proyecto;

    jest.spyOn(repo, 'findOne').mockResolvedValue(proyecto);
    jest.spyOn(repo, 'save').mockResolvedValue({ ...proyecto, estado: 3 });

    const result = await service.avanzarProyecto(1);
    expect(result.estado).toBe(3);
  });

  it('debe fallar si el proyecto ya está en el estado máximo (negativo)', async () => {
    const proyecto = {
      id: 2,
      estado: 4,
    } as Proyecto;

    jest.spyOn(repo, 'findOne').mockResolvedValue(proyecto);

    await expect(service.avanzarProyecto(2)).rejects.toThrow(
      'Proyecto ya en estado máximo',
    );
  });

  it('debe retornar al estudiante líder (positivo)', async () => {
    const proyecto: Proyecto = {
      id: 1,
      titulo: 'X',
      area: 'X',
      presupuesto: 0,
      notaFinal: 0,
      estado: 0,
      fechaInicio: '',
      fechaFin: '',
      lider: {
        id: 42,
        cedula: 123,
        nombre: 'Líder',
        semestre: 6,
        programa: 'Ing',
        promedio: 4,
        proyectos: [],
      },
      mentor: {
        id: 99,
        cedula: 456,
        nombre: 'Profesor X',
        departamento: 'Ciencias',
        extension: 1963,
        esParEvaluador: false,
        evaluaciones: [],
        mentorias: [],
      },
      evaluaciones: [],
    };

    jest.spyOn(repo, 'findOne').mockResolvedValue(proyecto);

    const result = await service.findAllEstudiantes(1);
    expect(result).toEqual([proyecto.lider]);
  });

  it('debe fallar si el proyecto no existe (negativo)', async () => {
    jest.spyOn(repo, 'findOne').mockResolvedValue(null);

    await expect(service.findAllEstudiantes(99)).rejects.toThrow(
      'Proyecto no encontrado',
    );
  });
});
