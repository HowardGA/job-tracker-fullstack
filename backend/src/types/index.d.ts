import { Role } from '@prisma/client';

declare module 'express' {
  export interface Request {
    user?: {
      userId: string;
      name: string;
      role: Role;
    };
  }
}

declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: string;
        name: string;
        role: Role;
      };
    }
  }
}

export {};