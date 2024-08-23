import { ConfigService } from '@nestjs/config';
import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Scope,
} from '@nestjs/common';
import { Request } from 'express';
import { REQUEST } from '@nestjs/core';

import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Injectable({ scope: Scope.REQUEST })
export class SupabaseService {
  private clientInstance: SupabaseClient;

  constructor(
    @Inject(REQUEST) private readonly request: Request,
    private readonly configService: ConfigService,
  ) {}

  async getClient() {
    if (this.clientInstance) {
      return this.clientInstance;
    }

    const supabaseUrl = this.configService.get<string>('SUPABASE_API_URL');
    const supabaseKey = this.configService.get<string>('SUPABASE_ANON_KEY');

    if (!supabaseUrl || !supabaseKey) {
      throw new Error('Supabase URL and API key must be provided');
    }

    this.clientInstance = createClient(supabaseUrl, supabaseKey, {
      auth: {
        persistSession: false,
      },
    });

    return this.clientInstance;
  }
  async signUp(email: string, password: string, name: string) {
    const client = await this.getClient();
    const { data: existingUser } = await client
      .from('users')
      .select()
      .eq('email', email);

    if (existingUser && existingUser.length > 0) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }

    const { data, error } = await client.auth.signUp({
      email,
      password,
    });

    if (error) {
      throw error;
    }

    // insert to user table
    try {
      await client.from('users').insert<CreateUserDto>({
        email,
        name,
        password,
      });
    } catch (error) {
      //TODO: add log here
      throw error;
    }

    return data;
  }

  async signIn(email: string, password: string) {
    const client = await this.getClient();
    const { data, error } = await client.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.BAD_REQUEST,
      );
    }

    return data.session;
  }

  async signOut() {
    const client = await this.getClient();
    const { error } = await client.auth.signOut();
    if (error) {
      throw error;
    }

    return true;
  }
}
