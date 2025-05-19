import { Controller, Post, Body } from '@nestjs/common';
import { EvaluacionService } from './evaluacion.service';
import { CreateEvaluacionDto } from './dto/create-evaluacion.dto';

@Controller('evaluaciones')
export class EvaluacionController {
  constructor(private readonly evaluacionService: EvaluacionService) {}

  @Post()
  async crearEvaluacion(@Body() dto: CreateEvaluacionDto) {
    return this.evaluacionService.crearEvaluacion(dto);
  }
}
