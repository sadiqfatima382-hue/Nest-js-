import { Column, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn, CreateDateColumn } from "typeorm";
import { Post } from "../../posts/entities/post.entity.js";

export enum UserRole{
    User= 'user',
    Admin = 'admin',
}

@Entity()
export class User{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique:true})
    email : string;

    @Column()
    name : string;

    @Column()
    password : string;

    @Column({
    type:'enum',
    enum: UserRole,
    default : UserRole.User
   }) 
   role: UserRole
   @OneToMany(()=>Post, (post)=>post.authorName)
   Posts: Post[]
     
   @CreateDateColumn()
   createdAt: Date;

   @UpdateDateColumn()
   updatedAt: Date;

}
