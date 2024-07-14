import { typeList } from '../constants/index.js';

const parseContact = contactType => {
    if (typeof contactType !== 'string') return;
    return typeList.includes(contactType) ? contactType : undefined;
};

const parseIsFavourite = isFavourite => {
  const isBoolean = isFavourite === 'true' || isFavourite === 'false';
    if (!isBoolean) return;

  return isFavourite === 'true' ? true : false;
};

const parseContactsFilterParams = ({ contactType, isFavourite }) => {
    const parsedContactType = parseContact(contactType);
    const parsedFavourite = parseIsFavourite(isFavourite);

    return {
        contactType: parsedContactType,
        isFavourite: parsedFavourite,
    };
};

export default parseContactsFilterParams;
