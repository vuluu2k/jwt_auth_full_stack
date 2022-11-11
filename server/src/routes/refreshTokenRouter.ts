import express from 'express';
import { verify, Secret } from 'jsonwebtoken';
import dataSource from '../config/db';

// import { User } from '../entities/User';
import { UserAuthPayload } from '../types/UserAuthPayload';
import { createToken, sendRefreshToken } from '../utils/auth';
const router = express.Router();

router.get('/', async (req, res) => {
  console.log(req.cookies);

  const refreshToken = req.cookies[process.env.REFRESH_TOKEN_COOKIE_NAME as string];

  if (!refreshToken) return res.sendStatus(401);

  try {
    const decodedUser = verify(refreshToken, process.env.REFRESH_TOKEN_SECRET as Secret) as UserAuthPayload;

    const existingUser = await dataSource
      .createQueryRunner()
      .manager.query('SELECT id, username FROM public."user" WHERE id = $1', [decodedUser.userId]);

    if (!existingUser) return res.sendStatus(401);

    sendRefreshToken(res, existingUser);

    return res.json({
      code: 200,
      success: true,
      message: 'Get refresh token successfully',
      user: existingUser,
      accessToken: createToken('accessToken', existingUser),
    });
  } catch (error) {
    return res.sendStatus(500);
  }
});

export default router;
