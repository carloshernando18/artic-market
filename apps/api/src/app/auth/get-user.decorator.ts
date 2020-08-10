import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from './user.entity';

export const GetUser = createParamDecorator(
  (data, executionContext: ExecutionContext): User => {
    const request = executionContext.switchToHttp().getRequest();
    return request.user;
  }
);
