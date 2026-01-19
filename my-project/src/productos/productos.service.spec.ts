import { Test, TestingModule } from '@nestjs/testing';
import { ProductosService } from './productos.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Producto } from './producto.entity';

describe('ProductosService', () => {
  let service: ProductosService;

  const mockRepo = {
    find: jest.fn(),
    findOneBy: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductosService,
        {
          provide: getRepositoryToken(Producto),
          useValue: mockRepo,
        },
      ],
    }).compile();

    service = module.get<ProductosService>(ProductosService);
  });

  it('debería crear un producto', async () => {
    const dto = { nombre: 'Teclado', precio: 200000 };

    mockRepo.create.mockReturnValue(dto);
    mockRepo.save.mockResolvedValue({ id: '1', ...dto });

    const result = await service.create(dto as any);

    expect(result).toEqual({ id: '1', ...dto });
    expect(mockRepo.create).toHaveBeenCalledWith(dto);
  });
});
