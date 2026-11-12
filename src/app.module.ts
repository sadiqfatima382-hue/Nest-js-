import { Module } from '@nestjs/common';
import { createObserveModule } from '@nestjs/observe';
import { AppService } from './app.service.js';
import { AppController } from './app.controller.js';
import { UserModule } from './user/user.module.js';
import { ProductModule } from './product/product.module.js';
import { config } from 'process';
import { ConfigModule } from '@nestjs/config';
import { PostsModule } from './posts/posts.module.js';
import * as joi from 'joi';
import appConfig from './config/app.config.js';
import {TypeOrmModule} from '@nestjs/typeorm'
export const { ObserveModule, ObserveInstrument } = createObserveModule();

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true, 
    // validationSchema:joi.object({App_Name: joi.string().default("defaultApp")})
    load: [appConfig]
    }),
    ObserveModule.forRoot({
      appKey: process.env.OBSERVE_APP_KEY ?? 'YOUR_APP_KEY',
      appSecret: process.env.OBSERVE_APP_SECRET ?? 'YOUR_APP_SECRET',
      serviceId: 'nest-js',
    }),

    TypeOrmModule.forRoot({type:'postgres', host:'localhost', port: 5432, username: 'postgres', password: 'post', database: 'nest-js'
                                      
    }),
    UserModule,ProductModule, PostsModule,

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
