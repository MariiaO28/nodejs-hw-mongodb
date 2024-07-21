import bcrypt from 'bcrypt';

export const hashValue = async (value) => {
    return await bcrypt.hash(value, 10);
};

export const compareValue = (value, hash) => {
    return bcrypt.compare(value, hash);
};
