import { Module } from '@nestjs/common';
import { ContentsController } from './contents.controller';
import { ContentsService } from './contents.service';
import { MongooseModule } from "@nestjs/mongoose";
import { ContentsSchema } from "./schemas/contents.schema";
import { MulterModule } from '@nestjs/platform-express';


@Module({
  imports: [MongooseModule.forFeature([
    {name: 'Contents', schema: ContentsSchema}
]),
MulterModule.register({
  dest: 'upload',
})],
  controllers: [ContentsController],
  providers: [ContentsService],
  exports: [ContentsService]
})
export class ContentsModule {}
