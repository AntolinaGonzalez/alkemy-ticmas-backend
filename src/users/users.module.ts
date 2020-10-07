import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UsersController } from "./users.controller";
import { UsersSchema } from "./schemas/users.schema";
import { UsersService } from "./users.service";
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt-auth.strategy';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants'
import { LocalStrategy } from './strategies/local.strategy';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: "Users", schema: UsersSchema }]),
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [UsersController],
  providers: [UsersService, LocalStrategy, JwtStrategy],
  exports:[UsersService]
})
export class UsersModule {}
