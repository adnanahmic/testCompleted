import 'dotenv/config';
import 'reflect-metadata';
import fs from 'fs';
import path from 'path';

import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';

import './utils/response/customSuccess';
import { errorHandler } from './middleware/errorHandler';
import routes from './routes';
import { dbCreateConnection } from './typeorm/dbCreateConnection';
import { User } from 'typeorm/entities/users/User';
import { getRepository } from 'typeorm';
import { Role } from 'typeorm/entities/users/types';

export const app = express();
app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(morgan('combined'));

app.use('/', routes);

app.use(errorHandler);

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

(async () => {
  await dbCreateConnection();
  let user = new User();
  const userRepository = getRepository(User);
  try {
    const userExists = await userRepository.findOne({ where: { email: 'admin@todo.com' } });

    if (!userExists) {
      user.username = 'Admin';
      user.name = 'Admin User';
      user.email = 'admin@todo.com';
      user.password = 'password';
      user.hashPassword();
      user.role = 'ADMINISTRATOR' as Role;
      await userRepository.save(user);

      user = new User();
      user.username = 'User';
      user.name = 'User Simple';
      user.email = 'user@todo.com';
      user.password = 'password';
      user.hashPassword();
      user.role = 'STANDARD' as Role;
      await userRepository.save(user);
    }
  } catch (e) {}
})();
