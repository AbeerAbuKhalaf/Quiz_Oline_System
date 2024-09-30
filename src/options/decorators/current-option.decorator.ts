import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
export const CurrentOption = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<Request>();
    const currentOption= request.option;
    return currentOption;
  },
);
