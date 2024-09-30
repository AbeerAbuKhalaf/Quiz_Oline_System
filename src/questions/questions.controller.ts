import {
  BadRequestException,
  Controller,
  NotFoundException,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { Get, Param, Post, Body, Delete, Patch } from '@nestjs/common';
import { Question } from './question.entity';
import { CreateQuestionDto } from './dtos/create-question.dto';
import { UpdateQuestinDto } from './dtos/update-question.dto';
import { JwtAuthGuard } from 'src/guards/auth.guard';
import { UseGuards } from '@nestjs/common';
import { BodyDto } from 'src/quizzes/decorator/assign';
import { AuthService } from 'src/users/auth.service';
import { JwtService } from '@nestjs/jwt';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { QuizzesService } from 'src/quizzes/quizzes.service';
import { RolesGuard } from 'src/guards/role.guard';
import { Roles } from 'src/quizzes/quizzes.controller';
import { BodyDtoUpdateAll } from 'src/quizzes/decorator/update-ALL.decorator';
import { I18nService } from 'nestjs-i18n';
@ApiTags('Question Module')
@Controller('questions')
export class QuestionsController {
  constructor(
    private questionService: QuestionsService,
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
    private readonly quizService: QuizzesService,
    private i18n: I18nService,
  ) {}

  //------------------------------------Retrieve Question -----------------------------------------------
  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a question by ID' })
  @ApiParam({
    name: 'id',
    description: 'The unique identifier of the question',
    required: true,
    type: 'string',
    example: '1234',
  })
  @ApiResponse({
    status: 200,
    description: 'Question retrieved successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'Question not found',
  })
  async getQuestion(@Param('id') id: string): Promise<Question> {
    try {
      const question = await this.questionService.findOne(id);
      if (!question) {
        throw new NotFoundException(
          await this.i18n.translate('test.QUESTION NOT FOUND'),
        );
      }
      return question;
    } catch (error) {
      throw new NotFoundException(
        error.message || 'Failed to retrieve question',
      );
    }
  }

  //------------------------------------Create Question (Admin Only) -------------------------------------
  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  @Roles('admin')
  @ApiOperation({ summary: 'Create a new question (Admin only)' })
  @ApiBearerAuth()
  @ApiResponse({
    status: 201,
    description: 'Question created successfully',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden. Only admins can create questions',
  })
  async createQuestion(
    @BodyDto(CreateQuestionDto) createQuestionDto: CreateQuestionDto,
  ): Promise<Question> {
    try {
      const question = await this.questionService.create(createQuestionDto);
      return question;
    } catch (error) {
      throw new BadRequestException(
        this.i18n.translate('test.FAILED TO CREATE Question'),
      );
    }
  }

  //------------------------------------Update Question -------------------------------------------------
  @UseGuards(JwtAuthGuard)
  @Patch('/:id')
  @ApiOperation({ summary: 'Update a question by ID' })
  @ApiResponse({
    status: 200,
    description: 'Question updated successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'Question not found',
  })
  async updateQuestion(
    @Param('id') id: string,
    @BodyDtoUpdateAll(UpdateQuestinDto) body: UpdateQuestinDto,
  ): Promise<Question> {
    try {
      const updatedQuestion = await this.questionService.findOne(id);
      if (!updatedQuestion) {
        throw new NotFoundException(
          this.i18n.translate('test.QUESTION_NOT_FOUND'),
        );
      }
      return updatedQuestion;
    } catch (error) {
      throw new BadRequestException(
        error.message || 'Failed to update question',
      );
    }
  }

  //------------------------------------Delete Question -------------------------------------------------
  @Delete('/:id')
  @ApiOperation({ summary: 'Delete a question by ID' })
  @ApiResponse({
    status: 200,
    description: 'Question deleted successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'Question not found',
  })
  async removeQuestion(
    @Param('id') id: string,
  ): Promise<{ message: string; question: Question }> {
    const question = await this.questionService.remove(id);

    return { message: 'Question deleted successfully', question };
  }
}
