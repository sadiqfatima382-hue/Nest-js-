import { IsEmail, IsNotEmpty,MinLength } from "class-validator";

export class LoginAuthDto {
    @IsEmail({},{message:'Please provide a valid email'})
    email: string;

    @IsNotEmpty({message:'Password is required'})  
     @MinLength(8,{message: 'Name must be atleast 8 characters long '})  
     password: string
}