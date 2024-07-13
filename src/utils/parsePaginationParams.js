const parseNumber = (value, defaultValue) => {
    if (typeof value !== 'string') {
        return defaultValue;
    };
    const parsedNumber = parseInt(value);
    if (Number.isNaN(parsedNumber)) {
        return defaultValue;
    }
    return parsedNumber;
};

const parsePaginationParams = ({ page, perPage }) => {
    const parsedPage = parseNumber(page, 1);
    const parsedPerPage = parseNumber(perPage, 10);

    return {
        page: parsedPage,
        perPage: parsedPerPage,
    };
};

export default parsePaginationParams;
