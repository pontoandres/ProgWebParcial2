/* eslint-disable prettier/prettier */
import { Controller, Post, Body, Delete, Param } from '@nestjs/common';
import { EstudianteService } from './estudiante.service';
import { CreateEstudianteDto } from './dto/create-estudiante.dto';

@Controller('estudiante')
export class EstudianteController {
  constructor(private readonly estudianteService: EstudianteService) {}
  
  @Post()
  crear(@Body() dto: CreateEstudianteDto) {
    return this.estudianteService.crearEstudiante(dto);
  }

  @Delete(':id')
  eliminar(@Param('id') id: string) {
    return this.estudianteService.eliminarEstudiante(+id);
  }
}
