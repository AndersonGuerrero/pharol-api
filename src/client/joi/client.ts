import Joi = require('@hapi/joi');


export const createClientSchema = Joi.object({
    rut: Joi.string().alphanum().min(9).max(9).required(),
    rut_chilen: Joi.string().alphanum().min(9).max(9).required(),
    name: Joi.string().max(100).required(), 
    last_name: Joi.string().max(100).required(),
    phone: Joi.string().min(13).max(14).required(),
    sex: Joi.string().valid('m', 'f').required(),
    address: Joi.array().items(Joi.string().required()),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required() 
});

export const updateClientSchema = Joi.object({
    rut: Joi.string().alphanum().min(9).max(9),
    rut_chilen: Joi.string().alphanum().min(9).max(9),
    name: Joi.string().max(100), 
    last_name: Joi.string().max(100),
    phone: Joi.string().min(13).max(14),
    sex: Joi.string().valid('m', 'f'),
    address: Joi.array().items(Joi.string()),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
});