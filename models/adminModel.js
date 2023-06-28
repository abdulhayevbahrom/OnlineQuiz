const { Schema, model } = require('mongoose')
const Joi = require("joi")

const adminSchema = new Schema({
    firstname: {
        type: String,
        required: true,
        min: 3
    },
    lastname: {
        type: String,
        required: true,
        min: 3
    },
    age: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
        required: true,
        min: 4
    },
    phoneNumber: {
        type: Number,
        required: true,
        min: 9
    },
    isActive: {
        type: Boolean,
        required: true
    },
    username: {
        type: String,
        required: true,
        min: 4
    },
    password: {
        type: String,
        required: true,
        min: 6
    },
    category: {
        type: String,
        required: true
    }
})

const Admins = model("admins", adminSchema)

const validateAdmin = (body) => {
    const schema = Joi.object({
        firstname: Joi.string().required().min(3),
        lastname: Joi.string().required().min(3),
        age: Joi.number().required().min(2),
        gender: Joi.string().required().min(4),
        phoneNumber: Joi.number().required().min(9),
        isActive: Joi.boolean().required(),
        username: Joi.string().required().min(4),
        password: Joi.string().required().min(4),
        category: Joi.string().required().min(2)
    })
    return schema.validate(body)
}

module.exports = { Admins, validateAdmin }