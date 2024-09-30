import { Controller, Get, Param, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { Throttle } from '@nestjs/throttler';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Throttle({ default: { limit: 2, ttl: 30 } })
  getHello(): string {
    return this.appService.getHello();
  }
  @Post()
  async setCacheKey(@Query('key') key: string, @Query('value') value: string) {
    await this.appService.setCacheKey(key, value);
    return {
      success: true,
      status: 201,
      message: 'Key cached successfully',
    };
  }

  @Get('/get/:key')
  async getCacheKey(@Param('key') key: string) {
    const data = await this.appService.getCacheKey(key);
    return {
      success: true,
      status: 200,
      data,
    };
  }
}
