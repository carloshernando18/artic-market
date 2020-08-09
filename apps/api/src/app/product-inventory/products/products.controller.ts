import { CreateProductDto, GetProductFilterDto } from '@artic-market/data';
import {
  Body,
  Controller,
  Get,
  Logger,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Product } from './product.entity';
import { ProductsService } from './products.service';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(
    private readonly logger: Logger,
    private readonly productsService: ProductsService
  ) {
    this.logger.setContext(ProductsController.name);
  }

  @Get()
  getProducts(
    @Query(ValidationPipe) getProductFilterDto: GetProductFilterDto
  ): Promise<Product[]> {
    this.logger.verbose(
      `retrieving all products. filter ${JSON.stringify(getProductFilterDto)}`
    );
    return this.productsService.getProducts(getProductFilterDto);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createProduct(@Body() createProductDto: CreateProductDto): Promise<Product> {
    this.logger.verbose(
      `Create product. data ${JSON.stringify(createProductDto)}`
    );
    return this.productsService.createProduct(createProductDto);
  }
}
