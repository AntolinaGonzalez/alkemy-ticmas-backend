import { Injectable } from '@nestjs/common';
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";

import { Course } from "./interfaces/courses.interface";
import { CreateCoursesDto } from "./dto/courses.dto";



@Injectable()
export class CoursesService {
    constructor(@InjectModel('Courses')private readonly courseModel: Model<Course>  ){}

    async createCourse(createCoursesDto: CreateCoursesDto): Promise<Course> {
       const course =  new this.courseModel(createCoursesDto);
       return await course.save();
    }

    async getCourses(userId: string){
        const courses = await this.courseModel.find({creator_id : userId})
        return courses;
    }
    
    async getCourse(courseId: string): Promise<Course> {
        const course = await this.courseModel.findById(courseId);
        return course;
    }

    async deleteCourse(courseId: string): Promise<Course> {
        const deletedCourse = await this.courseModel.findByIdAndDelete(courseId);
        return deletedCourse;
    }

    async updateCourse(courseId: string, createCoursesDto: CreateCoursesDto): Promise<Course> {
        const updatedCourse = await this.courseModel.findByIdAndUpdate(courseId,
             createCoursesDto, {new: true});
        return updatedCourse 
    }
}
