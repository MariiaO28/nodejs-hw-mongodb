import { createUser, loginUser, refreshUserSession, logoutUser, requestResetToken, resetPassword } from '../services/auth.js';
import { ONE_MONTH } from '../constants/index.js';

const setupSession = (res, session) => {
    res.cookie('refreshToken', session.refreshToken, {
        httpOnly: true,
        expires: new Date(Date.now() + ONE_MONTH),
    });

    res.cookie('sessionId', session._id, {
        httpOnly: true,
        expires: new Date(Date.now() + ONE_MONTH),
    });
};

export const createUserController = async (req, res) => {
    const user = await createUser(req.body);

    const data = {
        name: user.name,
        email: user.email,
    };

    res.status(201).json({
        status: 201,
        message: 'Successfully registered a user!',
        data,
    });
};

export const loginUserController = async (req, res) => {
    const session = await loginUser(req.body);

    setupSession(res, session);

    res.json({
        status: 200,
        message: 'Successfully logged in a user!',
        data: {
            accessToken: session.accessToken,
        },
    });
};

export const refreshUserSessionController = async (req, res) => {
    const session = await refreshUserSession({
        sessionId: req.cookies.sessionId,
        refreshToken: req.cookies.refreshToken,
    });

    setupSession(res, session);

    res.json({
        status: 200,
        message: 'Successfully refreshed a session!',
        data: {
            accessToken: session.accessToken,
        }
    });
};

export const logoutUserController = async (req, res) => {
    if (req.cookies.sessionId) {
        await logoutUser(req.cookies.sessionId);
    }

    res.clearCookie('sessionId');
    res.clearCookie('refreshToken');

    res.status(204).send();
};

export const requestResetEmailController = async (req, res) => {
    await requestResetToken(req.body.email);
     res.json({
        status: 200,
        message: 'Reset password email has been successfully sent.',
        data: {},
    });
};

export const resetPasswordController = async (req, res) => {
    await resetPassword(req.body);
    res.json({
        status: 200,
        message: 'Password has been successfully reset.',
        data: {}
    });
};


