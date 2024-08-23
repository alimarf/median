import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { SupabaseService } from './supabase.service';
import { SupabaseGuard } from './guard';

@Controller('auth')
export class SupabaseController {
  constructor(private readonly supabaseService: SupabaseService) {}

  @Post('signup')
  signUp(
    @Body('email') email: string,
    @Body('password') password: string,
    @Body('name') name: string,
  ) {
    return this.supabaseService.signUp(email, password, name);
  }

  @Post('signin')
  signIn(@Body('email') email: string, @Body('password') password: string) {
    return this.supabaseService.signIn(email, password);
  }

  @Post('signout')
  @UseGuards(SupabaseGuard)
  signOut() {
    return this.supabaseService.signOut();
  }
}
