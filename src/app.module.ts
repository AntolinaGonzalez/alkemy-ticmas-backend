import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { CoursesModule } from './courses/courses.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
import { Configuration } from './config/config.keys';
import { ContentsModule } from './contents/contents.module';




@Module({
  controllers: [AppController],
  imports: [
    CoursesModule,
    MongooseModule.forRoot('mongodb+srv://bmrec:oLM36WuO5ZUKlU9o@cluster0.y2qus.mongodb.net/ticmas?retryWrites=true&w=majority', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    }),
    UsersModule,
    AuthModule,
    ConfigModule,
  ],
  providers: [AppService],
})
export class AppModule {
  static port: number | string;

  constructor(private readonly _configService: ConfigService) {
    AppModule.port = process.env.PORT;
  }
}
