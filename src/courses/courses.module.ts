import { Module } from '@nestjs/common';
import {CoursesController} from './courses.controller'
import { CoursesService } from './courses.service';
import {MongooseModule} from '@nestjs/mongoose'
import { CoursesSchema } from './schemas/courses.schema';
import { UsersModule } from 'src/users/users.module';
import { SeccionsModule } from 'src/seccions/seccions.module';



@Module({
    imports: [SeccionsModule,
        MongooseModule.forFeature([
            {name: 'Courses', schema: CoursesSchema}
        ]), UsersModule    
    ],
    controllers: [CoursesController],
    providers: [CoursesService],
    exports:[CoursesService]
})
export class CoursesModule  {}
