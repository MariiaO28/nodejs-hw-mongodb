import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import router from './routers/index.js';
import env from './utils/env.js';
import errorHandler from './middlewares/errorHandler.js';
import notFoundHandler from './middlewares/notFoundHandler.js';

const PORT = Number(env('PORT', '3000'));

const setupServer = () => {
    const app = express();

    app.use(
        pino({
            transport: {
                target: 'pino-pretty',
            },
        }),
    );

    app.use(cors());

    app.use(express.json());

    app.use(router);

    app.use(errorHandler);

    app.use(notFoundHandler);

    app.use(cookieParser());

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });

};

export default setupServer;
