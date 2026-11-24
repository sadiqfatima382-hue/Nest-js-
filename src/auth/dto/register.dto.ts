import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class RegisterAuthDto {
    @IsEmail({}, { message: 'Please provide a valid email' })
    email: string;

    @IsNotEmpty({ message: 'Name is required' })
    @IsString({ message: ' Name must be a string' })
    @MinLength(3, { message: 'Name must be atleast 3 characters long ' })
    @MaxLength(50, { message: 'Name can not exceed 50 characters' })
    name: string;

    @IsNotEmpty({ message: 'Password is required' })
    @MinLength(8, { message: 'Name must be atleast 8 characters long ' })
    password: string
}
