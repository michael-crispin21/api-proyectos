import { ApiPropertyOptional } from '@nestjs/swagger';
import { EstadoTarea } from '@prisma/client';
import { IsEnum, IsOptional } from 'class-validator';

export class UpdateTareaDto {
  @ApiPropertyOptional({
    enum: EstadoTarea,
    example: EstadoTarea.en_curso,
    description: 'Nuevo estado de la tarea',
  })
  @IsOptional()
  @IsEnum(EstadoTarea)
  estado?: EstadoTarea;
}