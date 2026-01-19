import { Test, TestingModule } from '@nestjs/testing';
import { ProductosController } from './productos.controller';
import { ProductosService } from './productos.service';

describe('ProductosController', () => {
  let controller: ProductosController;

  const mockService = {
    create: jest.fn(),
    findAll: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductosController],
      providers: [
        {
          provide: ProductosService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<ProductosController>(ProductosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
