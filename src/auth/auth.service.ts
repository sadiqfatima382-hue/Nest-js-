import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/auth.entity.js';
import { Repository } from 'typeorm';
import { RegisterAuthDto } from './dto/register.dto.js';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User) private usersRepository: Repository<User>
    ) { }
    async register(RegisterAuthDto:RegisterAuthDto){
    const existingUser = await this.usersRepository.findOne({
        where: {email:RegisterAuthDto.email}
    })
    }
}
