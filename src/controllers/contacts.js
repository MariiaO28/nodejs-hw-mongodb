import createHttpError from 'http-errors';
import { getAllContacts, getContactById, createContact, patchContact, deleteContact } from '../services/contacts.js';
import parsePaginationParams from '../utils/parsePaginationParams.js';
import parseSortParams from '../utils/parseSortParams.js';


export const getAllContactsController = async (req, res) => {
    const { page, perPage } = parsePaginationParams(req.query);
    const { sortOrder, sortBy } = parseSortParams(req.query);
    const contacts = await getAllContacts({
        page,
        perPage,
        sortOrder,
        sortBy
    });

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


export const createContactController = async (req, res) => {
    const contact = await createContact(req.body);

    res.status(201).json({
        status: 201,
        message: 'Successfully created a contact!',
        data: contact,
    });
};

export const patchContactController = async (req, res, next) => {
    const { contactId } = req.params;
    const updatedResult = await patchContact(contactId, req.body);

    if (!updatedResult) {
        next(createHttpError(404, {
            status: 404,
            message: res.message,
            data: {message: "Contact not found"},
        }));
        return;
    }

    res.json({
        status: 200,
        message: 'Successfully patched a contact!',
        data: updatedResult,
    });

};

export const deleteContactController = async (req, res, next) => {
    const { contactId } = req.params;
    const result = await deleteContact(contactId);

    if (!result) {
        next(createHttpError(404, {
            status: 404,
            message: res.message,
            data: {message: "Contact not found"},
        }));
        return;
    }
    res.status(204).send();
};
