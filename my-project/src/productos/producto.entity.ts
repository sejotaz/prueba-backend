import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('productos')
export class Producto {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nombre: string;

  @Column('decimal', { precision: 10, scale: 2 })
  precio: number;

  @Column({ default: 0 })
  stock: number;
}
