import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class CreatePostDto {
    @IsNotEmpty({message : "Title is required"})
    @IsString({message: ' Title must be a string'})
    @MinLength(3,{message: 'Title must be atleast 3 characters long '})
    @MaxLength(50,{message:'Title can not exceed 50 characters'})
    title : string
}
