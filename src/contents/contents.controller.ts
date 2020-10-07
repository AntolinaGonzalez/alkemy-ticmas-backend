import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, Res, UploadedFiles, UseInterceptors, UploadedFile    } from '@nestjs/common';
import { FileFieldsInterceptor, FilesInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { url } from 'inspector';
import { fileURLToPath } from 'url';

import { ContentsService } from './contents.service';
import { CreateContentsDto } from './dto/contents.dto';

@Controller('contents')
export class ContentsController {
  constructor(private contentsService: ContentsService) {}

  @Get('/:id')
  async getContent(@Param('id') id) {
    const content = await this.contentsService.getContent(id);
    if (!content) throw new NotFoundException();
    return content;
  }



  @Post('/upload')
@UseInterceptors(
  FileInterceptor('image'),
)
async uploadedFile(@UploadedFile() file) {
const response = {
    originalname: file,
    filename: file,
    file : file
  };
  return response;
}

@Get('/upload/:imgpath')
seeUploadedFile(@Param('imgpath') image, @Res() res) {
  return res.sendFile(image, { root: './upload' });
}
  
  
  @Put(':id')
  async editContent(
    @Param('id') id,
    @Body() createContentDto: CreateContentsDto,
  ) {
    return this.contentsService.updateContent(id, createContentDto);
  }

  @Delete(':id')
  async deleteContent(@Param('id') id) {
    return this.contentsService.deleteContent(id);
  }
}
