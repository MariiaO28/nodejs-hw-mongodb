import createHttpError from 'http-errors';
import { getAllContacts, getContactById } from '../services/contacts.js';

export const getAllContactsController = async (req, res) => {
    const contacts = await getAllContacts();

    res.json({
        status: 200,
        message: 'Successfully found contacts!',
        data: contacts,
    });
};

export const getContactByIdController = async (req, res) => {
    const { contactId } = req.params;
    const data = await getContactById(contactId);

    if (!data) {
        throw createHttpError(404, `Contact with id ${contactId} is not found`);
    }

        res.json({
        status: 200,
        message: `Successfully found contact with id ${contactId}!`,
        data,
        });
};
