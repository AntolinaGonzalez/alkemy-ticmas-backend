import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";

import { UsersService } from "../users.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private service: UsersService) {
    super({ usernameField: "email", passwordField: "password" });
  }

  async validate(email: string, password: string) {
    const user = await this.service.validateUser(email, password);
    if (!user) {
      return {user:'noUser'}
    }
    return user;
  }
}
