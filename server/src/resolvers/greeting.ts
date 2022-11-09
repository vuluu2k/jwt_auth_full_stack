import { Ctx, Query, Resolver, UseMiddleware } from 'type-graphql';

import { checkAuth } from '../middlewares/checkAuth';
import { Context } from '../types/Context';
import { User } from '../entities/User';

@Resolver()
export class GreetingResolver {
  @Query((_return) => String)
  @UseMiddleware(checkAuth)
  async hello(@Ctx() context: Context): Promise<string> {
    try {
      const { user } = context;

      const existingUser = await User.findOneBy({ id: user.userId });
      console.log(user.userId, existingUser);

      return `Hello ${existingUser ? existingUser.username : 'World'}`;
    } catch (error) {
      console.log(error);
      return JSON.stringify(error);
    }
  }
}
