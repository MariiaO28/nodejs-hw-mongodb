import createHttpError from 'http-errors';
import { randomBytes } from 'crypto';
import jwt from 'jsonwebtoken';
import handlebars from 'handlebars';
import path from 'node:path';
import fs from 'node:fs/promises';
import User from '../db/models/User.js';
import Session from '../db/models/Session.js';
import { hashValue, compareValue } from '../utils/hash.js';
import { FIFTEEN_MINUTES, ONE_MONTH, SMTP, TEMPLATES_DIR } from '../constants/index.js';
import env from '../utils/env.js';
import sendEmail from '../utils/sendMail.js';

const createSession = () => {
  const accessToken = randomBytes(30).toString('base64');
  const refreshToken = randomBytes(30).toString('base64');

  return {
    accessToken,
    refreshToken,
    accessTokenValidUntil: new Date(Date.now() + FIFTEEN_MINUTES),
    refreshTokenValidUntil: new Date(Date.now() + ONE_MONTH),
  };
};

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

    const newSession = createSession();
    return await Session.create({
        userId: user._id,
        ...newSession
    });
};

export const refreshUserSession = async ({ sessionId, refreshToken }) => {
    const session = await Session.findOne({ _id: sessionId, refreshToken });
    if (!session) {
        throw createHttpError(401, 'Session is not found');
    }

    const isSessionTokenExpired = new Date() > new Date(session.refreshTokenValidUntil);
    if (isSessionTokenExpired) {
        throw createHttpError(401, 'Session token expired!');
    }

    const newSession = createSession();
    await Session.deleteOne({ _id: sessionId, refreshToken });
    return await Session.create({
        userId: session.userId,
        ...newSession,
    });
};

export const logoutUser = async sessionId => {
    await Session.deleteOne({ _id: sessionId});
};

export const requestResetToken = async email => {
    const user = await User.findOne({ email });

    if (!user) {
        throw createHttpError(404, 'User not found');
    }

    const resetToken = jwt.sign(
        {
        sub: user._id,
            email,
        },
        env('JWT_SECRET'),
        {
            expiresIn: '5m',
        }
    );

    const resetPasswordTemplatePath = path.join(TEMPLATES_DIR, 'reset-password-email.html');
    const templateSource = (await fs.readFile(resetPasswordTemplatePath)).toString();

    const template = handlebars.compile(templateSource);
    const html = template({
        name: user.name,
        link: `${env('APP_DOMAIN')}/reset-password?token=${resetToken}`,
    });

        await sendEmail({
        from: env(SMTP.SMTP_FROM),
        to: email,
        subject: 'Reset your password',
        html,
    }).catch(() => {
        throw createHttpError(500, 'Failed to send the email, please try again later.');
    });
};

export const resetPassword = async data => {
    let entries;

    try {
        entries = jwt.verify(data.token, env('JWT_SECRET'));
    } catch (error) {
        if (error instanceof Error) throw createHttpError(401, 'Token is expired or invalid.');
        throw error;
    }

    const user = await User.findOne({
        email: entries.email,
        _id: entries.sub,
    });
    if (!user) {
        throw createHttpError(404, 'User not found');
    }

    const hashPassword = await hashValue(data.password);
    await User.updateOne(
        {_id: user._id},
        {password: hashPassword},
    );

    await Session.deleteOne({ _id: user._id });
};
