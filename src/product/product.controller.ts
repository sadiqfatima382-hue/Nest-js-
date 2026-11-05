import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ProductService } from './product.service.js';


@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  getallProducts() {
    return this.productService.getallProducts();
  }

  @Get(':id')
  getProductbyId(@Param('id', ParseIntPipe) id: number) {
    return this.productService.getProductbyId(id);
  }

  @Get(':id/welcome')
    getWelcomeMessage(@Param('id', ParseIntPipe) id: number){
        return this.productService.getWelcomeMessage(id);
    }
}