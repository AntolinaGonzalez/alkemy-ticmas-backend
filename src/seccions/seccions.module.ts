import { Module } from '@nestjs/common';
import { SeccionsController } from './seccions.controller';
import { SeccionsService } from './seccions.service';
import { MongooseModule } from "@nestjs/mongoose";
import { SeccionsSchema } from "./schemas/seccions.schema";
import { ContentsModule } from "src/contents/contents.module";
import { ContentsService } from 'src/contents/contents.service';
@Module({
  imports: [MongooseModule.forFeature([{ name: "Seccions", schema: SeccionsSchema }]),ContentsModule],
  controllers: [SeccionsController],
  providers: [SeccionsService],
  exports:[SeccionsService]
})
export class SeccionsModule {}
