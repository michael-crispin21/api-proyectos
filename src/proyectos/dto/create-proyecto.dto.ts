import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateProyectoDto {
  @ApiProperty({
    example: 'Sistema de Ventas',
  })
  @IsString()
  @IsNotEmpty()
  nombre!: string;

  @ApiProperty({
    example: 'Proyecto Final de Sistemas',
  })
  @IsString()
  @IsNotEmpty()
  descripcion!: string;

  @ApiProperty({
    example: 1,
    description: 'ID del usuario creador',
  })
  @IsInt()
  idUsuarioCreador!: number;

  @ApiProperty({
    example: 2,
    description: 'ID del usuario ejecutor',
    required: false,
  })
  @IsOptional()
  @IsInt()
  idUsuarioEjecutor?: number;
}