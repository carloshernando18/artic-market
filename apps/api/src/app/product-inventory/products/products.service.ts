import { CreateProductDto, GetProductFilterDto } from '@artic-market/data';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { ProductRepository } from './product.repository';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductRepository)
    private readonly productRepository: ProductRepository
  ) {}

  async getProducts(
    getProductFilterDto: GetProductFilterDto
  ): Promise<Product[]> {
    return this.productRepository.getProducts(getProductFilterDto);
  }

  async createProduct(createProductDto: CreateProductDto): Promise<Product> {
    return this.productRepository.createProduct(createProductDto);
  }
}
