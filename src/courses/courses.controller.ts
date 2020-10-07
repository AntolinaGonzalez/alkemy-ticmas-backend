import {
  Controller,
  Param,
  Delete,
  Get,
  Post,
  Body,
  Put,
  Res,
  HttpStatus,
  NotFoundException,
  Request,
  UseGuards,
} from "@nestjs/common";
import { CreateCoursesDto } from "./dto/courses.dto";
import { CoursesService } from "./courses.service";
import { CreateSeccionsDto } from "src/seccions/dto/seccions.dto";
import { SeccionsService } from "src/seccions/seccions.service";
import { JwtAuthGuard } from "../users/guards/jwt-auth.guard";
@Controller("courses")
export class CoursesController {
  constructor(
    private coursesService: CoursesService,
    private sectionsService: SeccionsService
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async courses(@Request() req, @Body() createCoursesDto: CreateCoursesDto) {
    const courses = await this.coursesService.getCourses(req.user._id);
    const user = req.user.email;

    return { courses, user };
  }

  @Get(":id")
  async getCourse(@Res() res, @Param("id") id) {
    const course = await this.coursesService.getCourse(id);
    if (!course) throw new NotFoundException();
    return res.status(HttpStatus.OK).json(course);
  }

  @UseGuards(JwtAuthGuard)
  @Post("create")
  async storeCourse(
    @Request() req,
    @Res() res,
    @Body() createCoursesDto: CreateCoursesDto
  ) {
    createCoursesDto = req.body.course;
    const course = await this.coursesService.createCourse({
      ...createCoursesDto,
      creator_id: req.user._id,
    });
    return res.status(HttpStatus.OK).json({
      message: "received",
      course,
    });
  }

  @Delete(":id")
  async deleteCourse(@Res() res, @Param("id") id) {
    const course = await this.coursesService.deleteCourse(id);
    if (!course) throw new NotFoundException();
    return res.status(HttpStatus.OK).json({
      mesagge: "Course deleted",
      course,
    });
  }

  @Put(":id")
  async editCourse(
    @Res() res,
    @Param("id") id,
    @Body() createCoursesDto: CreateCoursesDto
  ) {
    const course = await this.coursesService.updateCourse(id, createCoursesDto);
    if (!course) throw new NotFoundException();
    return res.status(HttpStatus.OK).json({
      message: "Course updated",
      course,
    });
  }

  /* sections*/

  @Post("/:id/section")
  async storeSection(
    @Param("id") creator_id,
    @Res() res,
    @Body() createSeccionDto: CreateSeccionsDto
  ) {
    const seccion = await this.sectionsService.createSeccion({
      ...createSeccionDto,
      creator_id: creator_id,
    });
    return res.status(HttpStatus.OK).json({
      message: "received",
      seccion,
    });
  }

  @Get("/:creator_id/sections")
  async seccions(@Param() param) {
    return this.sectionsService.getSeccions(param.creator_id);
  }

  @Get('/:id/section')
  async findOne(@Param('id') id){
    const section = await this.sectionsService.findOne(id);
    return section;
  }
}
