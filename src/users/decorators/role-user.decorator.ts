import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'role';
export const Roles = (...roles: string[]) => {
  return SetMetadata(ROLES_KEY, roles);
};
