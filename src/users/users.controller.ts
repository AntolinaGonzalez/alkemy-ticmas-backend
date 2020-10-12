import {
  Controller,
  Post,
  Body,
  Get,
  Request,
  Res,
  HttpStatus,
  Delete,
  Put,
  Param,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUsersDto } from './dto/users.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private service: UsersService) {
  }

  @Post()
  async Store(@Res() res, @Body() createUsersDto: CreateUsersDto) {
    const user = await this.service.create(createUsersDto);

    return res.status(HttpStatus.OK).json({
      message: 'received',
      user: user,
    });
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.service.signIn(req.user);
  }

  
  @Delete()
  async delete(@Body('email') email: string) {
    return this.service.delete(email);
  }

  @Put('/:id')
  async update(@Param('id') id, @Body() createUsersDto: CreateUsersDto) {
    return this.service.update(id, createUsersDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
