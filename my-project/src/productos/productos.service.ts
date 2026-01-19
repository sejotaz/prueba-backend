import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Producto } from './producto.entity';
import { CreateProductoDto } from './dto/create-producto.dto';
import { NotFoundException } from '@nestjs/common';
import { UpdateProductoDto } from './dto/update-producto.dto';

@Injectable()
export class ProductosService {
  constructor(
    @InjectRepository(Producto)
    private repo: Repository<Producto>,
  ) {}

  async create(data: CreateProductoDto) {
    const producto = await this.repo.create(data);
    return this.repo.save(producto);
  }

  async findAll() {
    return await this.repo.find();
  }

  async findOne(id: string) {
    const producto = await this.repo.findOneBy({ id });
    if (!producto) {
      throw new NotFoundException(`Producto con ID ${id} no encontrado`);
    }
    return producto;
  }
  async update(id: string, data: UpdateProductoDto) {
    const producto = await this.findOne(id);
    Object.assign(producto, data);
    return this.repo.save(producto);
  }

  async delete(id: string) {
    const producto = await this.findOne(id);
    if (!producto) {
      throw new NotFoundException('Producto no encontrado');
    }
    await this.repo.delete(id);
    return { message: 'Producto eliminado correctamente' };
  }
}
