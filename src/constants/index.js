import path from 'node:path';

export const sortOrderList = ['asc', 'desc'];
export const keysOfContacts = [
        '_id',
        'name',
        'phoneNumber',
        'email',
        'isFavourite',
        'contactType',
        'createdAt',
        'updatedAt',
];

export const typeList = ['work', 'home', 'personal'];

export const FIFTEEN_MINUTES = 15 * 60 * 1000;

export const ONE_MONTH = 30 * 24 * 60 * 60 * 1000;

export const SMTP = {
  SMTP_HOST: 'SMTP_HOST',
  SMTP_PORT: 'SMTP_PORT',
  SMTP_USER: 'SMTP_USER',
  SMTP_PASSWORD: 'SMTP_PASSWORD',
  SMTP_FROM: 'SMTP_FROM',
};

export const TEMPLATES_DIR = path.join(process.cwd(), 'src', 'templates');

export const TEMP_UPLOAD_DIR = path.join(process.cwd(), 'temp');

export const UPLOAD_DIR = path.join(process.cwd(), 'upload');

export const CLOUDINARY = {
  CLOUDINARY_CLOUD_NAME: 'CLOUDINARY_CLOUD_NAME',
  CLOUDINARY_API_KEY: 'CLOUDINARY_API_KEY',
  CLOUDINARY_API_SECRET: 'CLOUDINARY_API_SECRET',
};

export const emailRegexp = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

export const SWAGGER_PATH = path.join(process.cwd(), 'docs', 'swagger.json');
