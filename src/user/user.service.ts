import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserService {

 constructor(private configService: ConfigService){}
    getUser(): string {
      const appName = this.configService.get<string>('appName')
      console.log(appName, 'appName')
      return `Hello ${appName}`
        // return 'HELLO NEST.JS!'
    }
    
   getHellowithname(name:string):string{
    return `Hello ${name}`
   }
}
