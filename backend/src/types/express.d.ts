import { Role } from '@prisma/client';

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
