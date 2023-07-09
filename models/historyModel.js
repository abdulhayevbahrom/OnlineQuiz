const { Schema, model } = require('mongoose')
const Joi = require('joi')

const historySchema = new Schema({
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    teacher: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    score: {
        totalscore: {
            type: String,
            required: true
        },
        quizLength: {
            type: String,
            required: true
        }
    }
})


const History = model('history', historySchema)

const validateHistory = (body) => {
    const schema = Joi.object({
        firstname: Joi.string().required().min(3),
        lastname: Joi.string().required().min(3),
        teacher: Joi.string().required().min(3),
        category: Joi.string().required(),
        score: Joi.object({
            totalscore: Joi.number().required(),
            quizLength: Joi.number().required()
        }),
        username: Joi.string().required().min(3)
    })

    return schema.validate(body)
}

module.exports = { History, validateHistory }