import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
  SetMetadata,
  UseGuards,
  BadRequestException,
  NotFoundException,
  ForbiddenException,
  InternalServerErrorException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/guards/auth.guard';
import { RolesGuard } from 'src/guards/role.guard';
import { AuthService } from 'src/users/auth.service';
import { CreateQuizDto } from './dtos/create_quizze.dto';
import { UpdateQuizDto } from './dtos/update_quizze.dto';
import { Quizze } from './quizze.entity';
import { QuizzesService } from './quizzes.service';
import { BodyDto } from 'src/quizzes/decorator/assign';
import { BodyDtoUpdateAll } from './decorator/update-ALL.decorator';
import { I18nService } from 'nestjs-i18n';
import { error } from 'console';

export const Roles = (...roles: string[]) => SetMetadata('role', roles);

@ApiTags('Quizzes Module')
@Controller('quizzes')
export class QuizzesController {
  constructor(
    private quizService: QuizzesService,
    private i18n: I18nService,
  ) {}

  //------------------------------------Get Quiz----------------------------------------------------------
  @Get(':id')
  @ApiOperation({ summary: 'Get a quiz by its ID' })
  @ApiResponse({
    status: 200,
    description: 'Quiz retrieved successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'Quiz not found',
  })
  async getQuiz(@Param('id') id: string): Promise<Quizze> {
    try {
      const quiz = await this.quizService.findOne(id);
      if (!quiz) {
        throw new NotFoundException(
          await this.i18n.translate('test.QUIZE NOT FOUND'),
        );
      }
      return quiz;
    } catch (error) {
      throw new NotFoundException(
        await this.i18n.translate('test.QUIZE NOT FOUND'),
      );
    }
  }

  //-----------------------------------Create Quiz (Admin Only)-------------------------------------------------
  @Roles('admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('create')
  @ApiOperation({ summary: 'Create a new quiz (Admin only)' })
  @ApiBearerAuth()
  @ApiResponse({
    status: 201,
    description: 'Quiz created successfully',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden. Only admins can create quizzes',
  })
  @ApiBody({
    description: 'Data to create a new quiz',
  })
  async createQuiz(@BodyDto(CreateQuizDto) createQuizDto: CreateQuizDto) {
    try {
      const quiz = await this.quizService.create(createQuizDto);
      return quiz;
    } catch (error) {
      if (error instanceof ForbiddenException) {
        throw new ForbiddenException(
          await this.i18n.translate('test.ADMIN ROLE'),
        );
      }
      throw new BadRequestException(
        await this.i18n.translate('test.FAILED TO CREATE QUIZZE'),
      );
    }
  }

  //-----------------------------------Update Quiz-------------------------------------------------------------
  @UseGuards(JwtAuthGuard)
  @Patch('/:id')
  @ApiOperation({ summary: 'Update a quiz by its ID' })
  @ApiResponse({
    status: 200,
    description: 'Quiz updated successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'Quiz not found',
  })
  async updateQuiz(
    @Param('id') id: string,
    @BodyDtoUpdateAll(UpdateQuizDto) body: UpdateQuizDto,
  ) {
    try {
      // const quiz = await this.quizService.update(id, body);
      const quiz = await this.quizService.findOne(id);
      if (!quiz) {
        throw new NotFoundException(
          await this.i18n.translate('test.QUIZE NOT FOUND'),
        );
      }
      const quiz_update = await this.quizService.update(id, body);
      return quiz_update;
    } catch (error) {
      throw new BadRequestException(error.message || 'Failed to update quiz');
    }
  
  }

  //-----------------------------------Delete Quiz-------------------------------------------------------------
  @Delete('/:id')
  @ApiOperation({ summary: 'Delete a quiz by its ID' })
  @ApiResponse({
    status: 200,
    description: 'Quiz deleted successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'Quiz not found',
  })
  async removeQuiz(@Param('id') id: string) {
    const quiz = await this.quizService.remove(id);

    return { message: 'Quiz deleted successfully',quiz };
  }
}
