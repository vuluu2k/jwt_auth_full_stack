import { Arg, Mutation, Resolver } from 'type-graphql';
import * as argon2 from 'argon2';

import { User } from '../entities/User';
import { RegisterInput } from '../types/RegisterInput';
import { LoginInput } from '../types/LoginInput';
import { UserMutationResponse } from '../types/UserMutationRespone';
import { createToken } from '../utils/auth';

@Resolver()
export class UserResolver {
  @Mutation((_return) => UserMutationResponse)
  async register(
    @Arg('registerInput')
    registerInput: RegisterInput,
  ): Promise<UserMutationResponse> {
    try {
      const { username, password } = registerInput;

      const existingUser = await User.findOneBy({ username });

      if (existingUser) {
        return {
          code: 400,
          success: false,
          message: 'Username was register in system',
        };
      }

      const hashedPassword = await argon2.hash(password);

      const newUser = User.create({ username, password: hashedPassword });
      await newUser.save();

      return {
        code: 200,
        success: true,
        message: 'User registration was successful',
        user: newUser,
      };
    } catch (error) {
      console.log(error);
      return {
        code: 500,
        success: false,
        message: 'Internal Sever Error',
      };
    }
  }

  @Mutation((_return) => UserMutationResponse)
  async login(
    @Arg('loginInput')
    loginInput: LoginInput,
  ): Promise<UserMutationResponse> {
    try {
      const { username, password } = loginInput;

      const existingUser = await User.findOneBy({ username });

      if (!existingUser) {
        return {
          code: 400,
          success: false,
          message: 'Username is does exist',
        };
      }

      const isPasswordValid = await argon2.verify(existingUser.password, password);
      if (!isPasswordValid) {
        return {
          code: 400,
          success: false,
          message: 'Password not correct',
        };
      }
      return {
        code: 200,
        success: true,
        message: 'Login Successfully',
        user: existingUser,
        accessToken: createToken(existingUser),
      };
    } catch (error) {
      console.log(error);
      return {
        code: 500,
        success: false,
        message: 'Internal Sever Error',
      };
    }
  }
}
