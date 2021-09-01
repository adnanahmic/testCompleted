import { ConnectionOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

const config: ConnectionOptions = {
  type: "sqlite",
  // url: process.env.DB_URL,
  database: './data.sql',
  synchronize: true,
  entities: ['src/typeorm/entities/**/*.ts'],
  cli: {
    entitiesDir: 'src/typeorm/entities',
  },
  namingStrategy: new SnakeNamingStrategy(),
};

export = config;
