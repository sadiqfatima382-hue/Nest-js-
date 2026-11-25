import {  ConflictException,  Injectable,  UnauthorizedException,} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User, UserRole } from './entities/auth.entity.js';
import { Repository } from 'typeorm';
import { RegisterAuthDto } from './dto/register.dto.js';
import { LoginAuthDto } from './dto/Login.dto.js';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async register(registerAuthDto: RegisterAuthDto) {
    const existingUser = await this.usersRepository.findOne({
      where: { email: registerAuthDto.email },
    });

    if (existingUser) {
      throw new ConflictException('Email already in use!');
    }

    const hashedPassword = await this.hashPassword(
      registerAuthDto.password,
    );

    const newlyCreatedUser = this.usersRepository.create({
      email: registerAuthDto.email,
      name: registerAuthDto.name,
      password: hashedPassword,
      role: UserRole.User,
    });

    const savedUser = await this.usersRepository.save(newlyCreatedUser);

    const { password, ...result } = savedUser;

    return {
      user: result,
      message: 'Registration successful! Login to continue.',
    };
  }

  async createAdmin(registerAuthDto: RegisterAuthDto) {
    const existingUser = await this.usersRepository.findOne({
      where: { email: registerAuthDto.email },
    });

    if (existingUser) {
      throw new ConflictException('Email already in use!');
    }

    const hashedPassword = await this.hashPassword(
      registerAuthDto.password,
    );

    const newlyCreatedUser = this.usersRepository.create({
      email: registerAuthDto.email,
      name: registerAuthDto.name,
      password: hashedPassword,
      role: UserRole.Admin,
    });

    const savedAdmin = await this.usersRepository.save(newlyCreatedUser);

    const { password, ...result } = savedAdmin;

    return {
      user: result,
      message: 'Admin created successfully!',
    };
  }

  async login(loginAuthDto: LoginAuthDto) {
    const user = await this.usersRepository.findOne({
      where: { email: loginAuthDto.email },
    });

    if (
      !user ||
      !(await this.verifyPassword(loginAuthDto.password, user.password))
    ) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const tokens = this.generateTokens(user);

    const { password, ...result } = user;

    return {
      user: result,
      ...tokens,
    };
  }

  private async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  private async verifyPassword(
    plainPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword);
  }

  private generateTokens(user: User) {
    return {
      accessToken: this.generateAccessToken(user),
      refreshToken: this.generateRefreshToken(user),
    };
  }

  private generateAccessToken(user: User): string {
    const payload = {
      email: user.email,
      sub: user.id,
      role: user.role,
    };

    return this.jwtService.sign(payload, {
      secret: 'jwt_secret',
      expiresIn: '15m',
    });
  }

  private generateRefreshToken(user: User): string {
    const payload = {
      sub: user.id,
    };

    return this.jwtService.sign(payload, {
      secret: 'refresh_secret',
      expiresIn: '7d',
    });
  }
}
