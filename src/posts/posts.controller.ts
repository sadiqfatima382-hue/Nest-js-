import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { PostsService } from './posts.service.js';
import { Post as PostInterface } from './interfaces/post.interface.js';


@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  findAll(@Query('search')search?:string): PostInterface[] {
   const extractAllPost = this.postsService.findAll()

   if(search){
    return extractAllPost.filter((singlePost) => singlePost.title.toLowerCase().includes(search.toLowerCase()))
   }
   return extractAllPost
  }
}
