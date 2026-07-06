import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProyectoDto } from './dto/create-proyecto.dto';
import { UpdateProyectoDto } from './dto/update-proyecto.dto';

@Injectable()
export class ProyectosService {
  constructor(private prisma: PrismaService) {}

  async create(createProyectoDto: CreateProyectoDto) {
    const creador = await this.prisma.usuario.findUnique({
      where: {
        id: createProyectoDto.idUsuarioCreador,
      },
    });

    if (!creador) {
      throw new NotFoundException('El usuario creador no existe');
    }

    const ejecutor = await this.prisma.usuario.findUnique({
      where: {
        id: createProyectoDto.idUsuarioEjecutor,
      },
    });

    if (!ejecutor) {
      throw new NotFoundException('El usuario ejecutor no existe');
    }
    const proyectoExiste = await this.prisma.proyecto.findFirst({
    where: {
        nombre: createProyectoDto.nombre,
        idUsuarioCreador: createProyectoDto.idUsuarioCreador,
        },
    });
    if (proyectoExiste) {
    throw new ConflictException(
        'Ya tienes un proyecto con ese nombre',
         );
    }
    return await this.prisma.proyecto.create({
      data: createProyectoDto,
    });
  }

  async findAll() {
    return await this.prisma.proyecto.findMany({
      include: {
        creador: true,
        ejecutor: true,
      },
    });
  }

  async findOne(id: number) {
    return await this.prisma.proyecto.findUnique({
      where: { id },
      include: {
        creador: true,
        ejecutor: true,
        tareas: true,
      },
    });
  }

  async update(id: number, updateProyectoDto: UpdateProyectoDto) {
    return await this.prisma.proyecto.update({
      where: { id },
      data: updateProyectoDto,
    });
  }

  async remove(id: number) {
    return await this.prisma.proyecto.delete({
      where: { id },
    });
  }
}