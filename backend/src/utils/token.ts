import jwt, {SignOptions} from 'jsonwebtoken';
import { jwtConfig } from '../config/jwt';

export const signToken = (payload: { userId: string; name: string; role: string }) => {
    const options: SignOptions = {
        expiresIn: jwtConfig.expiresIn
    };

    return jwt.sign(payload, jwtConfig.secret, options);
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, jwtConfig.secret);
};
