import { Controller, Delete } from '@nestjs/common';
import { Get, Patch, Body, Param, Post } from '@nestjs/common';
import { ResponsesService } from './responses.service';
import { Response } from './response.entity';
import { CreateResponseDto } from './dtos/create-response.dto';
import { UpdateResponseDto } from './dtos/update-response.dto';
import { MongoMissingCredentialsError } from 'typeorm';

@Controller('responses')
export class ResponsesController {
  constructor(private responseService: ResponsesService) {}

  @Get(':id')
  async getResponse(@Param('id') id: string): Promise<Response> {
    return this.responseService.findOne(id);
  }
  @Post()
  async createResponse(@Body() createQuizrDto: CreateResponseDto) {
    this.responseService.create(createQuizrDto);
  }

  @Patch('/:id')
  updateResponse(@Param('id') id: string, @Body() body: UpdateResponseDto) {
    return this.responseService.update(id, body);
  }

  @Delete('/:id')
  removeResponse(@Param('id') id: string) {
    return this.responseService.remove(id);
  }
}

