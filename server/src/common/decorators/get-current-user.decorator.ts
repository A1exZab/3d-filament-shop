import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtPayloadWithRefresh } from 'src/auth/types';

export const GetCurrentUser = createParamDecorator(
  (data: keyof JwtPayloadWithRefresh, context: ExecutionContext): string => {
    const request = context.switchToHttp().getRequest();
    if (!data) return request.user;
    return request.user[data];
  },
);
