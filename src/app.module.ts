import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EstudianteModule } from './estudiante/estudiante.module';
import { ProfesorModule } from './profesor/profesor.module';
import { ProyectoModule } from './proyecto/proyecto.module';
import { EvaluacionModule } from './evaluacion/evaluacion.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'parcialdb',
      synchronize: true,
      autoLoadEntities: true,
    }),
    EstudianteModule,
    ProfesorModule,
    ProyectoModule,
    EvaluacionModule,
  ],
})
export class AppModule {}
