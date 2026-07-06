import { ApiProperty } from '@nestjs/swagger';
import { EstadoTarea } from '@prisma/client';
import { IsEnum, IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateTareaDto {
  @ApiProperty({
    example: 'Crear módulo de Login',
  })
  @IsString()
  @IsNotEmpty()
  descripcion: string;

  @ApiProperty({
    example: 1,
  })
  @IsInt()
  idProyecto: number;

  @ApiProperty({
    example: 1,
    description: 'Usuario que asigna',
  })
  @IsInt()
  idUsuarioAsigna: number;

  @ApiProperty({
    example: 3,
    description: 'Usuario que recibe la tarea',
  })
  @IsInt()
  idUsuarioAsignado: number;

  @ApiProperty({
    enum: EstadoTarea,
    example: EstadoTarea.pendiente,
  })
  @IsEnum(EstadoTarea)
  estado: EstadoTarea;
}