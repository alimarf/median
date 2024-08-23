import { Module } from '@nestjs/common';
import { SupabaseService } from './supabase.service';
import { SupabaseStrategy } from './strategy';
import { SupabaseController } from './supabase.controller';

@Module({
  providers: [SupabaseService, SupabaseStrategy],
  controllers: [SupabaseController],
})
export class SupabaseModule {}
