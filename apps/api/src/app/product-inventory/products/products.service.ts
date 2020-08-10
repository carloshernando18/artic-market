import { CreateProductDto, GetProductFilterDto } from '@artic-market/data';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { ProductRepository } from './product.repository';
import { User } from '../../auth/user.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductRepository)
    private readonly productRepository: ProductRepository
  ) {}

  async getProducts(
    getProductFilterDto: GetProductFilterDto,
    user: User
  ): Promise<Product[]> {
    return this.productRepository.getProducts(getProductFilterDto, user);
  }

  async createProduct(
    createProductDto: CreateProductDto,
    user: User
  ): Promise<Product> {
    return this.productRepository.createProduct(createProductDto, user);
  }
}
