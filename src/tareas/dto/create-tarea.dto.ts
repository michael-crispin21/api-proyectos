import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateTareaDto {

  @ApiProperty({
    example: 'Crear módulo de Login',
  })
  @IsString()
  @IsNotEmpty()
  descripcion!: string;

  @ApiProperty({
    example: 1,
    description: 'Proyecto al que pertenece la tarea',
  })
  @IsInt()
  idProyecto!: number;

  @ApiPropertyOptional({
    example: 1,
    nullable: true,
    description: 'Usuario que crea/asigna inicialmente la tarea. Puede ir en null o como "Sin_asignar" para una tarea sin asignador.',
  })
  @IsOptional()
  idUsuarioAsigna?: number | null | string;

}