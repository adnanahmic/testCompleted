declare namespace NodeJS {
  export interface ProcessEnv {
    PORT: string;
    NODE_ENV: string;
    DB_URL: string;
    JWT_SECRET: string;
    JWT_EXPIRATION: string;
  }
}
