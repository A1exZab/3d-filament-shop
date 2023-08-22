import { Body, Controller, Get, Post } from '@nestjs/common';
import { MaterialService } from './material.service';
import { CreateMaterialDto } from './dto/create-material.dto';
import { Public } from 'src/common/decorators';

@Controller('material')
export class MaterialController {
  constructor(private readonly materialService: MaterialService) {}

  @Public()
  @Get()
  getAllMaterials() {
    return this.materialService.getAllMaterials();
  }

  @Public()
  @Post()
  add(@Body() materialDto: CreateMaterialDto) {
    return this.materialService.addMaterial(materialDto);
  }
}
