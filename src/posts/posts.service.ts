import { Injectable, NotFoundException, } from '@nestjs/common';
import { date } from 'joi';
import { inject } from 'vitest';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity.js';
import { CreatePostDto } from './dto/create-post.dto.js';
import { title } from 'process';
import path from 'path';
import { UpdatePostDto } from './dto/update-post.dto.js';

@Injectable()
export class PostsService {
 private posts: Post [] = [
  {
    id: 1,
    title: "First title",
    content: "First Post Content",
    authorName: "Fatima",
    createdAt: new Date()
  },

   {
    id: 2,
    title: "Second title",
    content: "Second Post Content",
    authorName: "Hamza",
    createdAt: new Date()
  },

   {
    id: 3,
    title: " Third title",
    content: "Third Post Content",
    authorName: "Anam",
    createdAt: new Date()
  }
 ];
 constructor(
  @InjectRepository(Post)
  private postsRepository: Repository <Post>
 ){}
 async findAll():Promise<Post[]> {
   return this.postsRepository.find();
 }

 async findOne(id:number):Promise<Post>{
  const singlePost = await this.postsRepository.findOneBy({id});
  if(!singlePost){
    throw new NotFoundException(`Post with id ${id} is not found`)
  }
  return singlePost
 }
  async create(createPostData:CreatePostDto): Promise<Post> {
  const newPost = this.postsRepository.create({
   title: createPostData.title,
   content: createPostData.content,
   authorName: createPostData.authorName
  })
  this.postsRepository.save(newPost)
 }
 
 async update(id:number, updatePostData : UpdatePostDto):Promise<Post>{
   const updatedPost = await this.findOne(id);
   if (updatePostData.title){
    updatedPost.title = updatePostData.title
   }
   if (updatePostData.content){
    updatedPost.content = updatePostData.content
   }
   if (updatePostData.authorName){
    updatedPost.authorName = updatePostData.authorName
   }
  } 

  remove(id:number):{message : string}{
    const currentPostIndextoDelete = this.posts.findIndex(post=> post.id===id);
    if(currentPostIndextoDelete===-1) {
       throw new NotFoundException(`Post with id ${id} is not found`)
    }
    this.posts.splice(currentPostIndextoDelete, 1)
    return {message: `Post with Id ${id} has been deleted`};
  }
 private getNextId(): number{
  return this.posts.length>0?
  Math.max(...this.posts.map(post=> post.id))+1 : 1
 }


}
