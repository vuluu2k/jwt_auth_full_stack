import { AuthenticationError } from 'apollo-server-express';
import { Secret, verify } from 'jsonwebtoken';
import { MiddlewareFn } from 'type-graphql';

import { Context } from '../types/Context';
import { UserAuthPayload } from '../types/UserAuthPayload';

export const checkAuth: MiddlewareFn<Context> = ({ context }, next) => {
  console.log(context.res);
  try {
    const authHeader = context.req.header('authentization');
    const accessToken = authHeader && authHeader.split(' ')[1];
    if (accessToken) {
      const decodedUser = verify(accessToken, process.env.ACCESS_TOKEN_SECRET as Secret) as UserAuthPayload;

      context.user = decodedUser;

      return next();
    } else {
      throw new AuthenticationError('Not authenticated');
    }
  } catch (error) {
    throw new AuthenticationError(`Error authenticating user, ${JSON.stringify(error)}`);
  }
};
