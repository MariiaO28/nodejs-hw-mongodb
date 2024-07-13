import { sortOrderList, keysOfContacts } from '../constants/index.js';

const parseSortParams = ({ sortOrder, sortBy }) => {
    const parsedSortOrder = sortOrderList.includes(sortOrder) ? sortOrder : sortOrderList[0];
    const parsedSortBy = keysOfContacts.includes(sortBy) ? sortBy: keysOfContacts[0];

    return {
        sortOrder: parsedSortOrder,
        sortBy: parsedSortBy,
    };
};

export default parseSortParams;
