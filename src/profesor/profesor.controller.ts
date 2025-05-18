import { Controller, Post, Body, Param } from '@nestjs/common';
import { ProfesorService } from './profesor.service';
import { CreateProfesorDto } from './dto/create-profesor.dto';

@Controller('profesor')
export class ProfesorController {
  constructor(private readonly profesorService: ProfesorService) {}

  @Post()
  crear(@Body() dto: CreateProfesorDto) {
    return this.profesorService.crearProfesor(dto);
  }

  @Post(':id/asignar-evaluador')
  asignar(@Param('id') id: string) {
    return this.profesorService.asignarEvaluador(+id);
  }
}
