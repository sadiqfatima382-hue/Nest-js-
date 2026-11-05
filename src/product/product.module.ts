import { Module } from '@nestjs/common';
import { ProductService } from './product.service.js';
import { ProductController } from './product.controller.js';
import { UserService } from '../user/user.service.js';
import { UserModule } from '../user/user.module.js';

@Module({
  controllers: [ProductController],
  providers: [ProductService],
  imports:[UserModule]
})
export class ProductModule {}
