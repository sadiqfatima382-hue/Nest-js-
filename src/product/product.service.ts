import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service.js';


@Injectable()
export class ProductService {
  constructor(private readonly userService: UserService){}

  getallProducts() {
    return [
      {
        id: 1, name: 'Lays'
      },

      {
        id: 2, name: 'Cheetos'
      },

      {
        id: 3, name: 'TurTure'
      }
    ]
  }

  getProductbyId(id:number){
    const product = this.getallProducts().find(product=> product.id===id)
    return product;
  }

  getWelcomeMessage(productId: number){
  const product = this.getProductbyId(productId)

  if(!product){
    return 'Product not found'
  }
  return this.userService.getHellowithname(product?.name)
  }
}

// create(createProductDto: CreateProductDto) {
//   return 'This action adds a new product';
// }

// findAll() {
//   return `This action returns all product`;
// }

// findOne(id: number) {
//   return `This action returns a #${id} product`;
// }

// update(id: number, updateProductDto: UpdateProductDto) {
//   return `This action updates a #${id} product`;
// }

// remove(id: number) {
//   return `This action removes a #${id} product`;
// }