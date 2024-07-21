import createHttpError from 'http-errors';
import Session from '../db/models/Session';
import User from '../db/models/User';

export const authenticate = async (req, res, next) => {
    const authHeader = req.get('Authorization');
    if (!authHeader) {
       return  next(createHttpError(401, 'Please provide Authorization header'));
    }

    const [bearer, accessToken] = authHeader.split(" ");
    if(bearer !== "Bearer") {
        return next(createHttpError(401, 'Token must have Bearer type'));
    }
    if(!accessToken) {
        return next(createHttpError(401, 'Token is missing'));
    }

    const session = await Session.findOne({ accessToken });
    if (!session) {
        return next(createHttpError(401, 'Session is not found'));
    };

    const isAccessTokenExpired = new Date() > new Date(session.accessTokenValidUntil);
    if (isAccessTokenExpired) {
        return next(createHttpError(401, 'Access token expired'));
    }

    const user = await User.findById(session.userId);
    if (!user) {
        return next(createHttpError(401, 'User not found'));
    }
    req.user = user;

    next();
};

export default authenticate;
