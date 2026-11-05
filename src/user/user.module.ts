import { Module } from '@nestjs/common';
import { UserController } from './user.controller.js';
import { UserService } from './user.service.js';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports:[],// import other modules if needed
  exports:[UserService]
})
export class UserModule {}
