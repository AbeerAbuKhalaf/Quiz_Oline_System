import {
  Controller,
  Delete,
  UseGuards,
  NotFoundException,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { Get, Patch, Body, Param, Post } from '@nestjs/common';
import { ResponsesService } from './responses.service';
import { Response } from './response.entity';
import { CreateResponseDto } from './dtos/create-response.dto';
import { UpdateResponseDto } from './dtos/update-response.dto';
import { BodyDto } from 'src/quizzes/decorator/assign';
import { JwtAuthGuard } from 'src/guards/auth.guard';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { BodyDtoUpdateAll } from 'src/quizzes/decorator/update-ALL.decorator';
import { I18nService } from 'nestjs-i18n';

@ApiTags('Response Module')
@Controller('responses')
export class ResponsesController {
  constructor(
    private responseService: ResponsesService,
    private i18n: I18nService,
  ) {}

  //------------------------------------Retrieve Response -----------------------------------------------
  @Get(':id')
  @ApiOperation({ summary: 'Get a specific response by ID' })
  @ApiParam({
    name: 'id',
    description: 'The unique identifier of the response',
    example: 'a1b2c3d4',
  })
  @ApiResponse({
    status: 200,
    description: 'Response details retrieved successfully',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'string', example: 'a1b2c3d4' },
        user_id: { type: 'string', example: 'user123' },
        quiz_id: { type: 'string', example: 'quiz123' },
        question_id: { type: 'string', example: 'question123' },
        selected_option_id: { type: 'string', example: 'option456' },
        created_by: { type: 'string', example: 'admin789' },
        created_at: { type: 'string', example: '2024-09-17T12:34:56Z' },
        updated_by: { type: 'string', example: 'admin987' },
        updated_at: { type: 'string', example: '2024-09-18T12:34:56Z' },
      },
    },
  })
  @ApiResponse({ status: 404, description: 'Response not found' })
  async getResponse(@Param('id') id: string): Promise<Response> {
    try {
      const response = await this.responseService.findOne(id);
      if (!response) {
        throw new NotFoundException(
          this.i18n.translate('test.RESPONSE_NOT_FOUND'),
        );
      }
      return response;
    } catch (error) {
      throw new NotFoundException(
        error.message || 'Failed to retrieve response',
      );
    }
  }

  //------------------------------------Create Response -----------------------------------------------
  @ApiBearerAuth() // JWT authentication required
  @ApiOperation({ summary: 'Create a response to a quiz question' })
  @ApiResponse({
    status: 201,
    description: 'Response created successfully',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'string', example: 'response123' },
        user_id: { type: 'string', example: 'user123' },
        quiz_id: { type: 'string', example: 'quiz123' },
        question_id: { type: 'string', example: 'question123' },
        selected_option_id: { type: 'string', example: 'option456' },
        created_at: { type: 'string', example: '2024-09-17T12:34:56Z' },
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Invalid data or request body' })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized, JWT token missing or invalid',
  })
  @UseGuards(JwtAuthGuard)
  @Post()
  async createResponse(
    @BodyDto(CreateResponseDto) createResponseDto: CreateResponseDto,
  ): Promise<Response> {
    try {
      const createdResponse =
        await this.responseService.create(createResponseDto);
      return createdResponse;
    } catch (error) {
      throw new BadRequestException(
        error.message || 'Failed to create response',
      );
    }
  }

  //------------------------------------Update Response -----------------------------------------------
  @UseGuards(JwtAuthGuard)
  @Patch('/:id')
  @ApiOperation({ summary: 'Update an existing response by ID' })
  @ApiParam({
    name: 'id',
    description: 'The unique identifier of the response',
    required: true,
    type: 'string',
    example: 'response123',
  })
  @ApiResponse({
    status: 200,
    description: 'Response updated successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid data or request body',
  })
  @ApiResponse({
    status: 404,
    description: 'Response not found',
  })
  async updateResponse(
    @Param('id') id: string,
    @BodyDtoUpdateAll(UpdateResponseDto) body: UpdateResponseDto,
  ): Promise<Response> {
    try {
      const updatedResponse = await this.responseService.update(id, body);
      if (!updatedResponse) {
        throw new NotFoundException('Response not found');
      }
      return updatedResponse;
    } catch (error) {
      throw new BadRequestException(
        error.message || 'Failed to update response',
      );
    }
  }

  //------------------------------------Delete Response -----------------------------------------------
  @Delete('/:id')
  @ApiOperation({ summary: 'Delete a response by ID' })
  @ApiParam({
    name: 'id',
    description: 'The unique identifier of the response',
    required: true,
    type: 'string',
    example: 'response123',
  })
  @ApiResponse({
    status: 200,
    description: 'Response deleted successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'Response not found',
  })
  async removeResponse(@Param('id') id: string): Promise<{ message: string }> {
    try {
      const deletedResponse = await this.responseService.remove(id);
      if (!deletedResponse) {
        throw new NotFoundException('Response not found');
      }
      return { message: 'Response deleted successfully' };
    } catch (error) {
      throw new BadRequestException(
        error.message || 'Failed to delete response',
      );
    }
  }
}
