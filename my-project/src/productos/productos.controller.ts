import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { ProductosService } from './productos.service';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('productos')
@Controller('productos')
export class ProductosController {
  constructor(private readonly service: ProductosService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un producto' })
  @ApiResponse({ status: 201, description: 'Producto creado' })
  create(@Body() dto: CreateProductoDto) {
    return this.service.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los productos' })
  @ApiResponse({ status: 200, description: 'Lista de productos' })
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un solo producto' })
  @ApiResponse({ status: 200, description: 'Producto encontrado' })
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un producto' })
  @ApiResponse({ status: 200, description: 'Producto actualizado' })
  update(@Param('id') id: string, @Body() dto: UpdateProductoDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un producto' })
  @ApiResponse({ status: 200, description: 'Producto eliminado' })
  remove(@Param('id') id: string) {
    return this.service.delete(id);
  }
}
