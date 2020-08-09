import { CreateProductDto, GetProductFilterDto } from '@artic-market/data';
import { InternalServerErrorException, Logger } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { Product } from './product.entity';

@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {
  private logger = new Logger();

  async getProducts(
    getProductFilterDto: GetProductFilterDto
  ): Promise<Product[]> {
    let products = [];
    const query = this.createQueryBuilder('product');
    if (getProductFilterDto.search) {
      query.andWhere('product.name LIKE :name', {
        name: `%${getProductFilterDto.search}%`,
      });
    }
    try {
      products = await query.getMany();
    } catch (error) {
      this.logger.error(
        `Failed to get products, filter: ${JSON.stringify(
          getProductFilterDto
        )}`,
        error.stack
      );
      throw new InternalServerErrorException('Failed to get products');
    }
    return products;
  }

  async createProduct(createProductDto: CreateProductDto): Promise<Product> {
    const product = this.create();
    product.name = createProductDto.name;
    try {
      await product.save();
    } catch (error) {
      this.logger.error(
        `Failed to create product, data: ${JSON.stringify(createProductDto)}`,
        error.stack
      );
      throw new InternalServerErrorException('Failed to create product');
    }
    return product;
  }
}
