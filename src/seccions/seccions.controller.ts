import {
  Controller,
  Param,
  Delete,
  Get,
  Body,
  Put,
  Res,
  HttpStatus,
  NotFoundException,
  Request, Post
} from "@nestjs/common";
import { CreateContentsDto } from "src/contents/dto/contents.dto";
import { CreateSeccionsDto } from "./dto/seccions.dto";
import { ContentsService } from "src/contents/contents.service"
import { SeccionsService } from "./seccions.service";

@Controller("seccions")
export class SeccionsController {
  constructor(private seccionsService: SeccionsService,
    private contentService: ContentsService) { }

  @Get("/:id")
  async getSection(@Param("id") id) {
    const section = await this.seccionsService.getSeccion(id);
    if (!section) throw new NotFoundException();
    return section;
  }

  @Put('/:id')
  async editSection(@Param('id') id, @Body() createSeccionsDto: CreateSeccionsDto) {
    return this.seccionsService.updateSeccion(id, createSeccionsDto);
  }
  @Delete(':id')
  async delete(@Param('id') id) {
    return this.seccionsService.deleteSeccion(id)
  }


  /* Content */

  @Post("/:id/content")
  async storeContent(
    @Param("id") seccion_id,
    @Res() res,
    @Body() createContentDto: CreateContentsDto
  ) {
    const content = await this.contentService.createContent({
      ...createContentDto,
      seccion_id: seccion_id
    });
    return res.status(HttpStatus.OK).json({
      message: "recieved",
      content
    });
  }

  @Get("/:seccion_id/contents")
  async contents(@Param() param) {
    return this.contentService.getContents(param.seccion_id);
  }

}
