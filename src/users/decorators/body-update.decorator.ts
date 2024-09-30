import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export const BodyDtoUpadte = createParamDecorator(
  (dtoClass: any, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<Request>();
    const body = request.body;
    const dtoInstance = Object.assign(new dtoClass(), body);

    const currentUser = request.user;

    if (!dtoClass) {
      throw new Error('DTO class is required');
    }

    if (dtoInstance.updated_by === undefined) {
      dtoInstance.updated_by = currentUser ? currentUser.id : null;
    }

    return dtoInstance;
  },
);
