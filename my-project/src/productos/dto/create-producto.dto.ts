import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateProductoDto {

  @ApiProperty({ description: 'Nombre del producto' })
  @IsString()
  nombre: string;

  @ApiProperty({ description: 'Precio del producto' })
  @IsNumber()
  precio: number;

  @ApiProperty({ description: 'Stock del producto' })
  @IsNumber()
  stock: number;
}

