import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTareaDto } from './dto/create-tarea.dto';
import { UpdateTareaDto } from './dto/update-tarea.dto';

@Injectable()
export class TareasService {
  constructor(private prisma: PrismaService) {}

  async create(createTareaDto: CreateTareaDto) {

    // Verificar proyecto
    const proyecto = await this.prisma.proyecto.findUnique({
      where: {
        id: createTareaDto.idProyecto,
      },
    });

    if (!proyecto) {
      throw new NotFoundException('El proyecto no existe');
    }

    // Verificar usuario que asigna
    const asigna = await this.prisma.usuario.findUnique({
      where: {
        id: createTareaDto.idUsuarioAsigna,
      },
    });

    if (!asigna) {
      throw new NotFoundException('El usuario que asigna no existe');
    }

    // Verificar usuario asignado
    const asignado = await this.prisma.usuario.findUnique({
      where: {
        id: createTareaDto.idUsuarioAsignado,
      },
    });

    if (!asignado) {
      throw new NotFoundException('El usuario asignado no existe');
    }

    return await this.prisma.tarea.create({
      data: createTareaDto,
    });
  }

  async findAll() {
    return await this.prisma.tarea.findMany({
      include: {
        proyecto: true,
        asigna: true,
        asignado: true,
      },
    });
  }

  async findOne(id: number) {
    return await this.prisma.tarea.findUnique({
      where: { id },
      include: {
        proyecto: true,
        asigna: true,
        asignado: true,
      },
    });
  }

  async update(id: number, updateTareaDto: UpdateTareaDto) {
    return await this.prisma.tarea.update({
      where: { id },
      data: updateTareaDto,
    });
  }

  async remove(id: number) {
    return await this.prisma.tarea.delete({
      where: { id },
    });
  }
}