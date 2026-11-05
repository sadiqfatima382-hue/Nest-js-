import { Injectable } from '@nestjs/common';
import { Post } from './interfaces/post.interface.js';

@Injectable()
export class PostsService {
 private posts: Post [] = [
  {
    id: 1,
    title: "First title",
    content: "First Post Content",
    authorName: "Fatima",
    createdAt: new Date()
  }
 ];
 findAll(): Post [] {
   return this.posts;
 }

}
