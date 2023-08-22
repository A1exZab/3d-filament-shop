import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateMaterialDto } from './dto/create-material.dto';
import { Material, MaterialDocument } from './material.schema';

@Injectable()
export class MaterialService {
  constructor(
    @InjectModel(Material.name) private materialModel: Model<MaterialDocument>,
  ) {}

  async getAllMaterials(): Promise<MaterialDocument[]> {
    const materials = await this.materialModel.find();
    return materials;
  }

  async getMaterialById(materialId): Promise<MaterialDocument> {
    const material = await this.materialModel.findById(materialId);
    return material;
  }

  async addMaterial(materialDto: CreateMaterialDto): Promise<MaterialDocument> {
    try {
      const existingMaterial = await this.materialModel.findOne({
        name: materialDto.name,
      });

      if (existingMaterial) {
        throw new Error();
      }

      const newMaterial = await this.materialModel.create(materialDto);

      await newMaterial.save();

      return newMaterial;
    } catch (error) {
      throw new HttpException(
        'Материал с таким названием уже существует',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
