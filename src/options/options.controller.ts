import { Controller } from '@nestjs/common';
import { Param,Get,Post,Body,Patch,Delete } from '@nestjs/common';
import { OptionsService } from './options.service';
import { CreateOptionDto } from './dtos/create-option.dto';
import { UpdateOptionDto } from './dtos/update-option.dto';
import { Option } from './option.entity';
@Controller('options')
export class OptionsController {
    constructor(private  optionService: OptionsService ) {}

    @Get(':id')
    async getOption(@Param('id') id: string): Promise<Option > {
      return this.optionService.findOne(id);
    }
    @Post()
    async createOption(@Body() createOptionrDto: CreateOptionDto){
      this.optionService.create(createOptionrDto);
    }

    @Patch('/:id')
    updateOption(@Param('id') id:string, @Body() body:UpdateOptionDto){
     return this.optionService.update(id,body);
    }
  
  
    @Delete('/:id')
    removeOption(@Param('id') id:string){
      return this.optionService.remove(id);
    }
}
