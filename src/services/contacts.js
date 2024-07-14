import Contact from '../db/models/Contact.js';
import calculatePaginationData from '../utils/calculatePaginationData.js';
import {sortOrderList } from '../constants/index.js';

export const getAllContacts = async ({ page = 1, perPage = 10, sortBy = '_id', sortOrder= sortOrderList[0], filter = {},}) => {
    const limit = perPage;
    const skip = (page - 1) * perPage;

    const dataQuery = Contact.find();
    if(filter.contactType) {
        dataQuery.where('contactType').equals(filter.contactType);
    }
    if(filter.isFavourite !== undefined) {
        dataQuery.where('isFavourite').equals(filter.isFavourite);
    }

    const contactsCount = await Contact.find().merge(dataQuery).countDocuments();

    const data = await dataQuery.skip(skip).limit(limit).sort({ [sortBy]: sortOrder }).exec();

    const paginationData = calculatePaginationData(contactsCount, perPage, page);

    return {
        data: data,
        ...paginationData,
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
