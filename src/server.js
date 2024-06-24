import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import env from './utils/env.js';
import { getAllContacts, getContactById } from './services/contacts.js';

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

    app.get('/contacts', async (req, res) => {
        const contacts = await getAllContacts();

        res.json({
            status: 200,
            message: 'Successfully found contacts!',
            data: contacts,
        });
    });

    app.get('/contacts/:contactId', async (req, res) => {
        const { contactId } = req.params;

        try {
            const data = await getContactById(contactId);
            if (!data) {
            return res.status(404).json({
                message: `Contact with id ${contactId} is not found`,
            });
        };

        res.json({
            status: 200,
            message: `Successfully found contact with id ${contactId}!`,
            data,
        });
        }
        catch (error) {
            if (error.message.includes('Cast to ObjectId failed')) {
                error.status = 404;
            }
            const { status = 500 } = error;
            res.status(status).json({
                message: error.message
            });
        }
    });

    app.use((req, res) => {
        res.status(404).json({
            message: 'Not found',
        });
    });

    app.use((err, req, res) => {
        res.status(500).json({
            message: 'Something went wrong',
            err: err.message,
        });
    });

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });

};

export default setupServer;
