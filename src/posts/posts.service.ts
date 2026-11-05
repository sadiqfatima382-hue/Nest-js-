import { Injectable, NotFoundException } from '@nestjs/common';
import { Post } from './interfaces/post.interface.js';
import { error } from 'console';

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
 findAll(): Post [] {
   return this.posts;
 }

 findOne(id:number): Post{
  const singlePost = this.posts.find(post=> post.id===id);
  if(!singlePost){
    throw new NotFoundException(`Post with id ${id} is not found`)
  }
  return singlePost
 }

}
