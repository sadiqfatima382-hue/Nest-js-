import { Injectable, NotFoundException, } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity.js';
import { CreatePostDto } from './dto/create-post.dto.js';
import { UpdatePostDto } from './dto/update-post.dto.js';

@Injectable()
export class PostsService {
  private posts: Post[] = [
    {
      id: 1,
      title: "First title",
      content: "First Post Content",
      authorName: "Fatima",
      createdAt: new Date(),
      updatedDate: new Date(),
    },

    {
      id: 2,
      title: "Second title",
      content: "Second Post Content",
      authorName: "Hamza",
      createdAt: new Date(),
      updatedDate: new Date(),
    },

    {
      id: 3,
      title: " Third title",
      content: "Third Post Content",
      authorName: "Anam",
      createdAt: new Date(),
      updatedDate: new Date(),
    }
  ];
  constructor(
    @InjectRepository(Post)
    private postsRepository: Repository<Post>
  ) { }
  async findAll(): Promise<Post[]> {
    return this.postsRepository.find();
  }

  async findOne(id: number): Promise<Post> {
    const singlePost = await this.postsRepository.findOneBy({ id });
    if (!singlePost) {
      throw new NotFoundException(`Post with id ${id} is not found`)
    }
    return singlePost
  }
  async create(createPostData: CreatePostDto): Promise<Post> {
    const newPost = this.postsRepository.create({
      title: createPostData.title,
      content: createPostData.content,
      authorName: createPostData.authorName
    })
    return this.postsRepository.save(newPost);
  }

  async update(id: number, updatePostData: UpdatePostDto): Promise<Post> {
    const updatedPost = await this.findOne(id);
    if (updatePostData.title) {
      updatedPost.title = updatePostData.title
    }
    if (updatePostData.content) {
      updatedPost.content = updatePostData.content
    }
    if (updatePostData.authorName) {
      updatedPost.authorName = updatePostData.authorName
    }
    return this.postsRepository.save(updatedPost)
  }

  async remove(id: number): Promise<void> {
    const deletedPost = await this.findOne(id)
    await this.postsRepository.remove(deletedPost)
  }
}
