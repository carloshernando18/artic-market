import { CreateProductDto, GetProductFilterDto } from '@artic-market/data';
import { InternalServerErrorException, Logger } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { User } from '../../auth/user.entity';
import { Product } from './product.entity';

@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {
  private logger = new Logger();

  async getProducts(
    getProductFilterDto: GetProductFilterDto,
    user: User
  ): Promise<Product[]> {
    let products = [];
    const query = this.createQueryBuilder('product');
    query.where('product.userId = :userId', { userId: user.id });
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

  async createProduct(
    createProductDto: CreateProductDto,
    user: User
  ): Promise<Product> {
    const product = this.create();
    product.name = createProductDto.name;
    product.userId = user.id;
    try {
      await product.save();
    } catch (error) {
      this.logger.error(
        `Failed to create product, data: ${JSON.stringify(createProductDto)}`,
        error.stack
      );
      throw new InternalServerErrorException('Failed to create product');
    }
    delete product.userId;
    return product;
  }
}
