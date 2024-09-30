import {
  Controller,
  UseGuards,
  Param,
  Get,
  Post,
  Body,
  Patch,
  Delete,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { OptionsService } from './options.service';
import { CreateOptionDto } from './dtos/create-option.dto';
import { UpdateOptionDto } from './dtos/update-option.dto';
import { Option } from './option.entity';
import { BodyDto } from 'src/quizzes/decorator/assign';
import { JwtAuthGuard } from 'src/guards/auth.guard';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { BodyDtoUpadte } from 'src/users/decorators/body-update.decorator';
import { BodyDtoUpdateAll } from 'src/quizzes/decorator/update-ALL.decorator';
import { I18nService } from 'nestjs-i18n';

@ApiTags('Option Module')
@Controller('options')
export class OptionsController {
  constructor(private optionService: OptionsService,
    private i18n:I18nService
  ) {}

  //------------------------------------Retrieve Option -----------------------------------------------
  @Get(':id')
  @ApiOperation({ summary: 'Retrieve an option by ID' })
  @ApiParam({
    name: 'id',
    description: 'The unique identifier of the option',
    required: true,
    type: 'string',
    example: '1234',
  })
  @ApiResponse({
    status: 200,
    description: 'Option retrieved successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'Option not found',
  })
  async getOption(@Param('id') id: string): Promise<Option> {
    try {
      const option = await this.optionService.findOne(id);
      if (!option) {
        throw new NotFoundException(this.i18n.translate("test.OPTION_NOT_FOUND"))
      }
      return option;
    } catch (error) {
      throw new NotFoundException(error.message || 'Failed to retrieve option');
    }
  }

  //------------------------------------Create Option -------------------------------------------------
  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new option' })
  @ApiResponse({
    status: 201,
    description: 'Option created successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request, failed to create option',
  })
  async createOption(
    @BodyDto(CreateOptionDto) createOptionDto: CreateOptionDto,
  ): Promise<Option> {
    try {
      const createdOption = await this.optionService.create(createOptionDto);
      return createdOption;
    } catch (error) {
      throw new BadRequestException(error.message || 'Failed to create option');
    }
  }

  //------------------------------------Update Option -------------------------------------------------
  @UseGuards(JwtAuthGuard)
  @Patch('/:id')
  @ApiOperation({ summary: 'Update an option by ID' })
  @ApiParam({
    name: 'id',
    description: 'The unique identifier of the option',
    required: true,
    type: 'string',
    example: '1234',
  })
  @ApiResponse({
    status: 200,
    description: 'Option updated successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'Option not found',
  })
  async updateOption(
    @Param('id') id: string,
    @BodyDtoUpdateAll(UpdateOptionDto) updateOptionDto: UpdateOptionDto,
  ): Promise<Option> {
    try {
      const updatedOption = await this.optionService.update(
        id,
        updateOptionDto,
      );
      if (!updatedOption) {
        throw new NotFoundException('Option not found');
      }
      return updatedOption;
    } catch (error) {
      throw new BadRequestException(error.message || 'Failed to update option');
    }
  }

  //------------------------------------Delete Option -------------------------------------------------
  @Delete('/:id')
  @ApiOperation({ summary: 'Delete an option by ID' })
  @ApiParam({
    name: 'id',
    description: 'The unique identifier of the option',
    required: true,
    type: 'string',
    example: '1234',
  })
  @ApiResponse({
    status: 200,
    description: 'Option deleted successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'Option not found',
  })
  async removeOption(@Param('id') id: string): Promise<{ message: string }> {
    try {
      const option = await this.optionService.remove(id);
      if (!option) {
        throw new NotFoundException('Option not found');
      }
      return { message: 'Option deleted successfully' };
    } catch (error) {
      throw new BadRequestException(error.message || 'Failed to delete option');
    }
  }
}
