import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Auth } from './entities/auth.entity';
import { Repository } from 'typeorm';
import * as jwt from 'jsonwebtoken';
import crypto = require('crypto');
import { jwtConfig } from '../../shared/jwt/jwt.config';
import { IAdmin } from './interfaces/user.interface';

/***
 * Module: Admin Auth Module
 * Usecase: Creation of a superuser account that manages the creation of leads.
 * Author: Kelyn Paul Njeri
 * Best Practice Given Enough time: I would implement a full authentication system that makes use of both access and refresh tokens to manage user sessions.
 **/

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Auth) private readonly authRepository: Repository<Auth>,
  ) {}
  public async create(admin: any) {
    const exists = await this.authRepository.findOne({
      where: {
        email: admin.email,
      },
    });
    if (exists) {
      return {
        success: false,
        message: 'This email already exists.',
      };
    } else {
      admin.salt = crypto.randomBytes(128).toString('base64');
      admin.password = crypto
        .createHmac('sha256', admin.password + admin.salt)
        .digest('hex');
      const newUser: any = await this.authRepository.save(admin);
      // Update jwt token creation
      const jwtToken = jwt.sign(
        { id: admin.id, email: admin.email },
        process.env.SECRET_KEY,
        jwtConfig,
      );
      newUser.Token = jwtToken;

      return {
        success: true,
        user: {
          email: admin.email,
          token: jwtToken,
        },
      };
    }
  }

  public async login(credentials: any) {
    // Find the user
    const user = await this.authRepository.findOne({
      where: { email: credentials.email },
    });

    // Handle no user
    if (!user) {
      return {
        success: false,
        message: 'User does not exist.',
      };
    }

    // Compare password
    const inputPassword = crypto
      .createHmac('sha256', credentials.password + user.salt.trim())
      .digest('hex');
    const isPasswordCorrect = user.password.trim() === inputPassword.trim();

    // Handle incorrect password
    if (!isPasswordCorrect) {
      return {
        success: false,
        message: 'Password is not correct.',
      };
    }

    // Generate JWT token
    const jwtToken = jwt.sign(
      { id: user.id, email: user.email },
      process.env.SECRET_KEY,
      jwtConfig,
    );

    // Create response object
    const response = {
      user: {
        id: user.id,
        email: user.email.trim(),
      },
      token: jwtToken,
      success: true,
    };
    return response;
  }
}
