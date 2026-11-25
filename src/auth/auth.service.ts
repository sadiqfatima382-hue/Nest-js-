import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User, UserRole } from './entities/auth.entity.js';
import { Repository } from 'typeorm';
import { RegisterAuthDto } from './dto/register.dto.js';
import * as bcrypt from 'bcrypt'
@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User) private usersRepository: Repository<User>
    ) { }
    async register(RegisterAuthDto: RegisterAuthDto) {
        const existingUser = await this.usersRepository.findOne({
            where: { email: RegisterAuthDto.email }
        })
        if (existingUser) {
            throw new ConflictException('Email already in use ! Please try again with different email')
        }
        const hashedPassword = await this.hashPassword(RegisterAuthDto.password);

        const newlyCreatedUser = this.usersRepository.create({
            email: RegisterAuthDto.email,
            name: RegisterAuthDto.name,
            password: hashedPassword,
            role: UserRole.User
        })
        const saveUser = await this.usersRepository.save(newlyCreatedUser);
        const { password, ...result } = saveUser;
        return {
            user: result,
            message: 'Registration successfuly! Login to continue'
        }
    }
    async createAdmin(RegisterAuthDto: RegisterAuthDto)  {
        const existingUser = await this.usersRepository.findOne({
        where: { email: RegisterAuthDto.email }
    })
    if(existingUser) {
        throw new ConflictException('Email already in use ! Please try again with different email')
    }
    const hashedPassword = await this.hashPassword(RegisterAuthDto.password);

     const newlyCreatedUser = this.usersRepository.create({
            email: RegisterAuthDto.email,
            name: RegisterAuthDto.name,
            password: hashedPassword,
            role: UserRole.Admin
        })
}
    private async hashPassword(password: string): Promise<string> {
        return bcrypt.hash(password, 10);
    }

}
