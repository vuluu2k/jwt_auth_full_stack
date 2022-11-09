require('dotenv').config();
import { DataSource } from 'typeorm';

import { User } from '../../entities/User';

const dataSource = new DataSource({
  type: 'postgres',
  database: 'jwt_auth_full_stack',
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  logging: true,
  synchronize: true,
  entities: [User],
});

export default dataSource;
