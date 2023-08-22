import { JwtPayload } from './jwtPayload.type';
import { Tokens } from './tokens.type';

export type authRequest = Tokens & {
  user: JwtPayload;
};
