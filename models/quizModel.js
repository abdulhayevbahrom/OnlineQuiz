const { Schema, model } = require('mongoose')
const Joi = require("joi")

const quizSchema = new Schema({
    question: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    correctAnswer: {
        type: String,
        required: true
    },
    incorrectAnswers: {
        type: Array,
        required: true,
        min: 3,
        max: 3
    }
})


const Quizes = model("quizes", quizSchema)

const validateQuiz = (body) => {
    const schema = Joi.object({
        question: Joi.string().required().min(3),
        category: Joi.string().required().min(3),
        correctAnswer: Joi.string().required().min(3),
        incorrectAnswers: Joi.array().required().min(3).max(3)
    })
    return schema.validate(body)
}

module.exports = { Quizes, validateQuiz }