export class CreateProyectoDto {
  titulo: string;
  area: string;
  presupuesto: number;
  notaFinal: number;
  estado: number;
  fechaInicio: string;
  fechaFin: string;
  lider: number; // ID del estudiante
  mentor: number; // ID del profesor
}
