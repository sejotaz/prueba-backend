import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ProductosModule } from './productos/productos.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.getOrThrow('DB_HOST'),
        port: Number(config.getOrThrow('DB_PORT')),
        username: config.getOrThrow('DB_USER'),
        password: config.getOrThrow('DB_PASSWORD'),
        database: config.getOrThrow('DB_NAME'),
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
    ProductosModule,
  ],
})
export class AppModule {}
