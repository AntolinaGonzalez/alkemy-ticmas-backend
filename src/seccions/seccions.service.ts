import { Injectable } from '@nestjs/common';
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { CreateSeccionsDto } from "./dto/seccions.dto";
import { Seccion } from "./interfaces/seccions.interface";


@Injectable()
export class SeccionsService {
    constructor(@InjectModel('Seccions')private readonly seccionModel: Model<Seccion>  ){}

    async findOne(courseId: string){
        const section = await this.seccionModel.findOne({creator_id:courseId})
        return section;
    }
    
    async createSeccion(createSeccionsDto: CreateSeccionsDto): Promise<Seccion> {
        const seccion =  new this.seccionModel(createSeccionsDto);
        return await seccion.save();
     }

     async getSeccions(courseId: string): Promise<Seccion> {
        const seccions = await this.seccionModel.find({creator_id : courseId})
        return seccions;
    }

    async getSeccion(seccionId: string): Promise<Seccion> {
        const course = await this.seccionModel.findById(seccionId);
        return course;
    }

    async deleteSeccion(seccionId: string){
        const deletedSeccion = await this.seccionModel.findByIdAndDelete(seccionId);
        return {message: "section delete"};
    }

    async updateSeccion(seccionId: string, createSeccionDto: CreateSeccionsDto): Promise<Seccion> {
        const updatedSeccion = await this.seccionModel.findByIdAndUpdate(seccionId,
             createSeccionDto, {new: true});
        return updatedSeccion;
    }
}
