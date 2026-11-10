import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class CreatePostDto {
    @IsNotEmpty({message : "Title is required"})
    @IsString({message: ' Title must be a string'})
    @MinLength(3,{message: 'Title must be atleast 3 characters long '})
    @MaxLength(50,{message:'Title can not exceed 50 characters'})
    title : string

    @IsNotEmpty({message : "Content is required"})
    @IsString({message: ' Content must be a string'})
    @MinLength(5,{message: 'Content must be atleast 5 characters long '})
    content : string

    @IsNotEmpty({message : "Author is required"})
    @IsString({message: ' Author must be a string'})
    @MinLength(2,{message: 'Author must be atleast 2 characters long '})
    @MaxLength(20,{message:'Author can not exceed 20 characters'})
    authorName : string
}
 