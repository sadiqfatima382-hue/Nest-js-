import { number } from "joi";
import { text } from "stream/consumers";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
@Entity()
export class Post {
@PrimaryGeneratedColumn()
    id:number;
@Column({length : 50})
    title: string;
@Column({type : "text"})
    content: string;    
@Column({length : 50})
    authorName: string;
@CreateDateColumn()
    createdDate: Date;
@UpdateDateColumn()
    updatedDate:Date        
}

