import { SetMetadata } from '@nestjs/common';

export const Authorization = (authorizationRequired: boolean) =>
  SetMetadata('authorizationRequired', authorizationRequired);