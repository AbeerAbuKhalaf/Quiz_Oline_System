import {
  Controller,
  UseGuards,
  NotFoundException,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { Get, Post, Delete, Param, Body, Patch } from '@nestjs/common';
import { ScoresService } from './scores.service';
import { Score } from './score.entity';
import { CreateScoreDto } from './dtos/create-score.dto';
import { JwtAuthGuard } from 'src/guards/auth.guard';
import { BodyDto } from 'src/quizzes/decorator/assign';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { BodyDtoUpdateAll } from 'src/quizzes/decorator/update-ALL.decorator';
import { UpdateScoreDto } from './dtos/update-score.dto';

@ApiTags('Score Module')
@Controller('scores')
export class ScoresController {
  constructor(private scoreService: ScoresService) {}

  //------------------------------------Retrieve Score -----------------------------------------------
  @Get(':id')
  @ApiOperation({ summary: 'Get score by ID' })
  @ApiParam({
    name: 'id',
    description: 'The unique identifier of the score',
    example: 'score123',
  })
  @ApiResponse({
    status: 200,
    description: 'Retrieve the score information by ID',
  })
  @ApiResponse({ status: 404, description: 'Score not found' })
  async getScore(@Param('id') id: string): Promise<Score> {
    try {
      const score = await this.scoreService.findOne(id);
      if (!score) {
        throw new NotFoundException('Score not found');
      }
      return score;
    } catch (error) {
      throw new NotFoundException(error.message || 'Failed to retrieve score');
    }
  }

  //------------------------------------Create Score -----------------------------------------------
  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Create a new score' })
  @ApiBody({
    description: 'Score creation details',
    type: CreateScoreDto,
  })
  @ApiResponse({
    status: 201,
    description: 'The score has been successfully created',
  })
  @ApiResponse({ status: 400, description: 'Invalid data or request body' })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized, JWT token missing or invalid',
  })
  async createScore(
    @BodyDto(CreateScoreDto) createScoreDto: CreateScoreDto,
  ): Promise<Score> {
    try {
      const createdScore = await this.scoreService.create(createScoreDto);
      return createdScore;
    } catch (error) {
      throw new BadRequestException(error.message || 'Failed to create score');
    }
  }

  //------------------------------------Update Score -----------------------------------------------
  @UseGuards(JwtAuthGuard)
  @Patch('/:id')
  @ApiOperation({ summary: 'Update an existing score by ID' })
  @ApiParam({
    name: 'id',
    description: 'The unique identifier of the score',
    required: true,
    type: 'string',
    example: 'score123',
  })
  @ApiBody({
    description: 'Score update details',
    type: CreateScoreDto,
  })
  @ApiResponse({ status: 200, description: 'Score updated successfully' })
  @ApiResponse({ status: 400, description: 'Invalid data or request body' })
  @ApiResponse({ status: 404, description: 'Score not found' })
  async updateScore(
    @Param('id') id: string,
    @BodyDtoUpdateAll(UpdateScoreDto) body: UpdateScoreDto,
  ): Promise<Score> {
    try {
      const updatedScore = await this.scoreService.update(id, body);
      if (!updatedScore) {
        throw new NotFoundException('Score not found');
      }
      return updatedScore;
    } catch (error) {
      throw new BadRequestException(error.message || 'Failed to update score');
    }
  }

  //------------------------------------Delete Score -----------------------------------------------
  @Delete('/:id')
  @ApiOperation({ summary: 'Delete a score by ID' })
  @ApiParam({
    name: 'id',
    description: 'The unique identifier of the score',
    required: true,
    type: 'string',
    example: 'score123',
  })
  @ApiResponse({ status: 200, description: 'Score deleted successfully' })
  @ApiResponse({ status: 404, description: 'Score not found' })
  async removeScore(@Param('id') id: string): Promise<{ message: string }> {
    try {
      const deletedScore = await this.scoreService.remove(id);
      if (!deletedScore) {
        throw new NotFoundException('Score not found');
      }
      return { message: 'Score deleted successfully' };
    } catch (error) {
      throw new BadRequestException(error.message || 'Failed to delete score');
    }
  }
}
