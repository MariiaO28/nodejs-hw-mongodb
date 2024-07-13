import { Router } from 'express';
import { getAllContactsController, getContactByIdController, createContactController, patchContactController, deleteContactController } from '../controllers/contacts.js';
import { createContactSchema, updateContactSchema } from '../validation/contacts.js';
import ctrlWrapper from '../utils/ctrlWrapper.js';
import validateBody from '../middlewares/validateBody.js';
import isValidId from '../middlewares/isValidId.js';

const contactsRouter = Router();

contactsRouter.get('/contacts', ctrlWrapper(getAllContactsController));

contactsRouter.get('/contacts/:contactId', isValidId, ctrlWrapper(getContactByIdController));

contactsRouter.post('/contacts', validateBody(createContactSchema), ctrlWrapper(createContactController));

contactsRouter.patch('/contacts/:contactId', isValidId, validateBody(updateContactSchema), ctrlWrapper(patchContactController));

contactsRouter.delete('/contacts/:contactId',isValidId, ctrlWrapper(deleteContactController));

export default contactsRouter;
