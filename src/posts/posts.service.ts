import { Injectable, NotFoundException } from '@nestjs/common';
import { Post } from './interfaces/post.interface.js';
import { date } from 'joi';

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
  create(createPostData: Omit<Post, 'id'| 'createdAt'>): Post{
  const newPost : Post ={
    id : this.getNextId(),
    ...createPostData,
    createdAt: new Date()
  }
  this.posts.push(newPost)
  return newPost
 }
 
 update(id:number, updatePostData : Partial<Omit<Post, 'id'|'createdAt'>>): Post{
    const currentPostIndextoEdit = this.posts.findIndex((post)=> post.id===id);
    if(currentPostIndextoEdit===-1){
      throw new NotFoundException(`Post with id ${id} is not found`)                
    }
    this.posts[currentPostIndextoEdit]={
      ...this.posts[currentPostIndextoEdit],
      ...updatePostData,
      updatedAt : new Date()
    }
    return this.posts[currentPostIndextoEdit]
  } 
 private getNextId(): number{
  return this.posts.length>0?
  Math.max(...this.posts.map(post=> post.id))+1 : 1
 }

}
