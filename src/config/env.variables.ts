import * as dotenv from 'dotenv';

dotenv.config();


export const envVariables = {
    PORT: process.env.PORT || 3000,
    DB_HOST: process.env.DB_HOST || 'localhost',
    DB_PORT: process.env.DB_PORT || 5432,
    DB_USERNAME: process.env.DB_USERNAME || 'postgres',
    DB_PASSWORD: process.env.DB_PASSWORD || 'admin',
    DB_NAME: process.env.DB_NAME || 'ecommerce',
    JWT_SECRET: process.env.JWT_SECRET || 'secretKey',
    JWT_EXPIRATION_TIME: process.env.JWT_EXPIRATION || '1h',
};

