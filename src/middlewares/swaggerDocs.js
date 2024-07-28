import createHttpError from 'http-errors';
import swaggerUi from 'swagger-ui-express';
import fs from 'node:fs';
import { SWAGGER_PATH } from '../constants/index.js';

const swaggerDocs = () => {
    try {
        const swaggerDoc = JSON.parse(fs.readFileSync(SWAGGER_PATH).toString());
        return [...swaggerUi.serve, swaggerUi.setup(swaggerDoc)];
    } catch (error) {
        return (req, res, next) => next(createHttpError(500, 'Can not load swagger docs', error));
    };
};

export default swaggerDocs;
