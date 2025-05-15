import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EvaluacionService } from './evaluacion.service';
import { CreateEvaluacionDto } from './dto/create-evaluacion.dto';
import { UpdateEvaluacionDto } from './dto/update-evaluacion.dto';

@Controller('evaluacion')
export class EvaluacionController {
  constructor(private readonly evaluacionService: EvaluacionService) {}

  @Post()
  create(@Body() createEvaluacionDto: CreateEvaluacionDto) {
    return this.evaluacionService.create(createEvaluacionDto);
  }

  @Get()
  findAll() {
    return this.evaluacionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.evaluacionService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEvaluacionDto: UpdateEvaluacionDto) {
    return this.evaluacionService.update(+id, updateEvaluacionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.evaluacionService.remove(+id);
  }
}
