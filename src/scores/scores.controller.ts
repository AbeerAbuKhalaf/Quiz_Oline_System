import { Controller } from '@nestjs/common';
import { Get,Post,Delete,Param,Body,Patch } from '@nestjs/common';
import { ScoresService } from './scores.service';
import { Score } from './score.entity';
import { CreateScoreDto } from './dtos/create-score.dto';
@Controller('scores')
export class ScoresController {
  constructor(private scoreService: ScoresService) {}

  @Get(':id')
  async getScore(@Param('id') id: string): Promise<Score> {
    return this.scoreService.findOne(id);
  }
  @Post()
  async createScore(@Body() createScoreDto: CreateScoreDto) {
    this.scoreService.create(createScoreDto);
  }

  @Patch('/:id')
  updateScore(@Param('id') id: string, @Body() body: CreateScoreDto) {
    return this.scoreService.update(id, body);
  }

  @Delete('/:id')
  removeScore(@Param('id') id: string) {
    return this.scoreService.remove(id);
  }
}
