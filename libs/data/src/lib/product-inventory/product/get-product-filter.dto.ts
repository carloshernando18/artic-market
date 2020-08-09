import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class GetProductFilterDto {
  @ApiProperty()
  @IsOptional()
  @IsNotEmpty({ message: 'the search is required' })
  search: string;
}
