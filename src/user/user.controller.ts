import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service.js';


@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get()
    getUser(): string {
        return this.userService.getUser();
    }

    @Get('user/:name')
    getHellowithname(@Param('name') name:string){
        return this.userService.getHellowithname(name)
    }
}
