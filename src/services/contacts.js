import Contact from '../db/models/Contact.js';
import calculatePaginationData from '../utils/calculatePaginationData.js';
import {sortOrderList, keysOfContacts } from '../constants/index.js';

export const getAllContacts = async ({ page, perPage, sortBy = keysOfContacts[0], sortOrder= sortOrderList[0]}) => {
    const limit = perPage;
    const skip = (page - 1) * limit;
    const data = await Contact.find().skip(skip).limit(limit).sort({[sortBy]: sortOrder});
    const totalItems = await Contact.countDocuments();
    const { totalPages, hasPreviousPage, hasNextPage } = calculatePaginationData({total: totalItems, perPage, page});

    return {
        data,
        page,
        perPage,
        totalItems,
        totalPages,
        hasPreviousPage,
        hasNextPage,
    };
};

export const getContactById = contactId => Contact.findById(contactId);

export const createContact = data => Contact.create(data);

export const patchContact = async (contactId, data, options = {}) => {
   const result = await Contact.findOneAndUpdate(
        { _id: contactId },
        data,
        {
            new: true,
            includeResultMetadata: true,
            ...options,
        },
   );
    if (!result || !result.value) return null;

    return {
        contact: result.value,
        isNew: Boolean(result?.lastErrorObject?.upserted),
    };
};

export const deleteContact = contactId => Contact.findOneAndDelete({ _id: contactId});
