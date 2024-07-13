import Joi from 'joi';

export const createContactSchema = Joi.object({
    name: Joi.string().lowercase().min(3).max(20).required().pattern(/^[a-zA-Z ]+$/).messages({
        'string.min': 'Name should have at least 3 characters',
        'string.max': 'Name should have at most 20 characters',
        'any.required': 'Name is a required field',
        'string.pattern.base':'Name can only contain letters',
    }),
    phoneNumber: Joi.string().min(3).max(20).required().pattern(/^[0-9]+$/).messages({
        'string.min': 'Phone number should have at least 3 characters',
        'string.max': 'Phone number should have at most 20 characters',
        'any.required': 'Phone number is a required field',
        'string.pattern.base': 'Phone number can only contain numbers',
    }),
    email: Joi.string().lowercase().email().min(3).max(20).messages({
        'string.min': 'Email should have at least 3 characters',
        'string.max': 'Email should have at most 20 characters',
        'string.email': 'Email must be a valid email address',
    }),
    isFavourite: Joi.boolean(),
    contactType: Joi.string().min(3).max(20).valid('work', 'home', 'personal').required(),
});

export const updateContactSchema = Joi.object({
    name: Joi.string().min(3).max(20).pattern(/^[a-zA-Z ]+$/).messages({
        'string.min': 'Name should have at least 3 characters',
        'string.max': 'Name should have at most 20 characters',
        'string.pattern.base':'Name can only contain letters',
    }),
    phoneNumber: Joi.string().min(3).max(20).pattern(/^[0-9]+$/).messages({
        'string.min': 'Phone number should have at least 3 characters',
        'string.max': 'Phone number should have at most 20 characters',
        'string.pattern.base': 'Phone number can only contain numbers',
    }),
    email: Joi.string().email().min(3).max(20).messages({
        'string.min': 'Email should have at least 3 characters',
        'string.max': 'Email should have at most 20 characters',
        'string.email': 'Email must be a valid email address',
    }),
    isFavourite: Joi.boolean(),
    contactType: Joi.string().min(3).max(20).valid('work', 'home', 'personal'),
});

