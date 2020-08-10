import { CreateProductDto, GetProductFilterDto } from '@artic-market/data';
import {
  Body,
  Controller,
  Get,
  Logger,
  Post,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { GetUser } from '../../auth/get-user.decorator';
import { Product } from './product.entity';
import { ProductsService } from './products.service';
import { User } from '../../auth/user.entity';

@ApiTags('Products')
@Controller('products')
@UseGuards(AuthGuard())
export class ProductsController {
  constructor(
    private readonly logger: Logger,
    private readonly productsService: ProductsService
  ) {
    this.logger.setContext(ProductsController.name);
  }

  @Get()
  getProducts(
    @Query(ValidationPipe) getProductFilterDto: GetProductFilterDto,
    @GetUser() user: User
  ): Promise<Product[]> {
    this.logger.verbose(
      `retrieving all products. filter ${JSON.stringify(
        getProductFilterDto
      )}, userName: ${user.userName}`
    );
    return this.productsService.getProducts(getProductFilterDto, user);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createProduct(
    @Body(ValidationPipe) createProductDto: CreateProductDto,
    @GetUser() user: User
  ): Promise<Product> {
    this.logger.verbose(
      `Create product. data ${JSON.stringify(createProductDto)}, userName: ${
        user.userName
      }`
    );
    return this.productsService.createProduct(createProductDto, user);
  }
}
