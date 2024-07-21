import createHttpError from 'http-errors';
import { randomBytes } from 'crypto';
import User from '../db/models/User.js';
import Session from '../db/models/Session.js';
import { hashValue, compareValue } from '../utils/hash.js';
import { FIFTEEN_MINUTES, ONE_MONTH } from '../constants/index.js';

export const createUser = async data => {
    const user = await User.findOne({ email: data.email });
    if (user) throw createHttpError(409, 'Email in use');

    const hashPassword = await hashValue(data.password);

    return await User.create({
        ...data,
        password: hashPassword,
    });
};

export const loginUser = async data => {
    const user = await User.findOne({ email: data.email });
    if (!user) {
        throw createHttpError(404, 'User not found');
    }

    const isEqual = await compareValue(data.password, user.password);
    if (!isEqual) {
        throw createHttpError(401, 'Invalid password');
    }

    await Session.deleteOne({ userId: user._id });

    const accessToken = randomBytes(30).toString('base64');
    const refreshToken = randomBytes(30).toString('base64');

    return await Session.create({
        userId: user._id,
        accessToken,
        refreshToken,
        accessTokenValidUntil: new Date(Date.now() + FIFTEEN_MINUTES),
        refreshTokenValidUntil: new Date(Date.now()+ ONE_MONTH),
    });
};
