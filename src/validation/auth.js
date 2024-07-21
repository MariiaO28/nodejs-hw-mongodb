import Joi from 'joi';
import { joiPasswordExtendCore } from 'joi-password';

const joiPassword = Joi.extend(joiPasswordExtendCore);

export const createUserSchema = Joi.object({
    name: Joi.string().lowercase().min(3).max(20).required().pattern(/^[a-zA-Z ]+$/).messages({
        'string.min': 'Name should have at least 3 characters',
        'string.max': 'Name should have at most 20 characters',
        'any.required': 'Name is a required field',
        'string.pattern.base': 'Name can only contain letters',
    }),
    email: Joi.string().lowercase().email().min(3).max(20).messages({
        'string.min': 'Email should have at least 3 characters',
        'string.max': 'Email should have at most 20 characters',
        'string.email': 'Email must be a valid email address',
    }),

    password: joiPassword.string().min(8).max(20).minOfUppercase(1).minOfNumeric(1).minOfSpecialCharacters(1).onlyLatinCharacters().doesNotInclude(['password']).noWhiteSpaces().required().messages({
        'string.min': 'Password should have at least 8 characters',
        'string.max': 'Password should have at most 20 characters',
        'password.minOfUppercase': 'Password should contain at least 1 uppercase character',
        'password.minOfSpecialCharacters': 'Password should contain at least 1 special character',
        'password.minOfNumeric': 'Password should contain at least 1 numeric character',
        'password.doesNotInclude': 'Password is too common',
        'password.onlyLatinCharacters': 'Password should contain only latin characters',
        'password.noWhiteSpaces': 'Password should not contain white spaces',
    }),
});

export const loginUserSchema = Joi.object({
     email: Joi.string().email().required(),
     password: joiPassword.string().required(),
});
