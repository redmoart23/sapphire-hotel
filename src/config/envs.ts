/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
  PORT: number;
  POSTGRES_DB_USER: string;
  POSTGRES_DB_PASSWORD: string;
  POSTGRES_DB_NAME: string;
  POSTGRES_DB_HOST: string;
  POSTGRES_DB_PORT: number;
}

const envsSchema = joi
  .object({
    PORT: joi.number().required(),
    POSTGRES_DB_USER: joi.string().required(),
    POSTGRES_DB_PASSWORD: joi.string().required(),
    POSTGRES_DB_NAME: joi.string().required(),
    POSTGRES_DB_HOST: joi.string().required(),
    POSTGRES_DB_PORT: joi.number().required(),
  })
  .unknown(true);

const { error, value } = envsSchema.validate(process.env);

if (error) {
  throw new Error(`Config validation error: \${error.message}`);
}

const envVars: EnvVars = value;

export const envs = {
  port: envVars.PORT,
  dbUser: envVars.POSTGRES_DB_USER,
  dbPassword: envVars.POSTGRES_DB_PASSWORD,
  dbName: envVars.POSTGRES_DB_NAME,
  dbHost: envVars.POSTGRES_DB_HOST,
  dbPort: envVars.POSTGRES_DB_PORT,
};
