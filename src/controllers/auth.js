import { createUser, loginUser } from '../services/auth.js';
import { ONE_MONTH } from '../constants/index.js';

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

        res.cookie('refreshToken', session.refreshToken, {
            httpOnly: true,
            expires: new Date(Date.now() + ONE_MONTH),
        });

        res.cookie('sessionId', session._id, {
            httpOnly: true,
            expires: new Date(Date.now() + ONE_MONTH),
        });

    res.json({
        status: 200,
        message: 'Successfully logged in a user!',
        data: {
            accessToken: session.accessToken,
        },
    });
};
