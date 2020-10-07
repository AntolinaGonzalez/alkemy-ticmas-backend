import { Injectable } from '@nestjs/common';
import { Model } from "mongoose";
import { InjectModel, ModelDefinition } from "@nestjs/mongoose";
import { CreateContentsDto } from "./dto/contents.dto";
import { Content } from "./interfaces/contents.interface";
import { strict } from 'assert';
@Injectable()
export class ContentsService {
    constructor(@InjectModel('Contents')private readonly contentModel: Model<Content>){}

    async createContent(createContentsDto: CreateContentsDto): Promise<Content> {
        const content = new this.contentModel(createContentsDto);
        return await content.save();
    }

    async getContents(seccionId: string): Promise<Content> {
        const contents = await this.contentModel.find({seccion_id: seccionId})
        return contents;
    }

    async getContent(contentId: string): Promise<Content> {
        const content = await this.contentModel.findById(contentId);
        return content;
    }

    async deleteContent(contentId: string){
        const deletedContent = await this.contentModel.findByIdAndDelete(contentId);
        return deletedContent;
    }

    async updateContent(contentId: string, createContentsDto: CreateContentsDto): Promise<Content> {
        const updatedContent = await this.contentModel.findByIdAndUpdate(contentId, createContentsDto, {new: true});
        return updatedContent;
    }
}
