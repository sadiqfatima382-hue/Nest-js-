import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe, HttpCode, HttpStatus, Put } from '@nestjs/common';
import { PostsService } from './posts.service.js';
import type { Post as PostInterface } from './interfaces/post.interface.js';
import { CreatePostDto } from './dto/create-post.dto.js';
import { PostExistsPipe } from './pipes/post.pipes.js';
import { Post as PostEntity } from './entities/post.entity.js';
import { UpdatePostDto } from './dto/update-post.dto.js';
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) { }

  @Get()
  async findAll(): Promise<PostEntity[]> {
    return this.postsService.findAll()
  }


  @Get(':id')
  findOne(@Param('id', ParseIntPipe, PostExistsPipe) id: number): Promise<PostEntity> {
    return this.postsService.findOne(id)
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createPostData: CreatePostDto,): Promise<PostEntity> {
    return this.postsService.create(createPostData)
  }

  @Put(':id')
  async update(@Param('id', ParseIntPipe, PostExistsPipe) id: number, @Body() updatePostData: UpdatePostDto): Promise<PostEntity> {
    return this.postsService.update(id, updatePostData);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseIntPipe, PostExistsPipe) id: number): Promise<void> {
    this.postsService.remove(id);
  }
}
