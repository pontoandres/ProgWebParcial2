import { Controller, Post, Patch, Get, Param, Body } from '@nestjs/common';
import { ProyectoService } from './proyecto.service';
import { CreateProyectoDto } from './dto/create-proyecto.dto';

@Controller('proyecto')
export class ProyectoController {
  constructor(private readonly proyectoService: ProyectoService) {}

  @Post()
  crear(@Body() dto: CreateProyectoDto) {
    return this.proyectoService.crearProyecto(dto);
  }

  @Patch(':id/avanzar')
  avanzar(@Param('id') id: string) {
    return this.proyectoService.avanzarProyecto(+id);
  }

  @Get(':id/estudiantes')
  estudiantes(@Param('id') id: string) {
    return this.proyectoService.findAllEstudiantes(+id);
  }
}
