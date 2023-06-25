const { Router } = require('express')
const router = Router()
const { Quizes, validateQuiz } = require('../models/quizModel')

// GET
router.get('/', async (req, res) => {
    try {
        const quizes = await Quizes.find()
        if (!quizes.length) {
            return res.status(404).json({ state: false, msg: "Data is not defined", innerData: null })
        }
        res.status(200).json({ state: true, msg: "All quizes", innerData: quizes })
    }
    catch {
        res.status(500).json({ state: false, msg: "Server error", innerData: null })
    }
})

// POST

router.post('/create', async (req, res) => {
    try {
        const { value, error } = validateQuiz(req.body)
        if (error) {
            return res.status(421).json({ state: false, msg: error.details[0].message, innerData: null })
        }

        const newQuiz = await Quizes.create(value)
        const savedQuiz = await newQuiz.save()
        res.status(201).json({ state: true, msg: "ma'lumot saqlandi", innerData: savedQuiz })
    }
    catch {
        return res.status(400).json({ state: false, msg: "something went wrong", innerData: null })
    }
})

// DELETE

router.delete('/:_id', async (req, res) => {
    try {
        const deletedQuiz = await Quizes.findByIdAndDelete(req.params._id)
        res.status(200).json({ state: true, msg: "savol o'chirildi", data: deletedQuiz })
    }
    catch {
        res.status(400).json({ state: false, msg: "something went wrong", data: null })
    }
})


// PUT
router.put('/:_id', async (req, res) => {
    try {
        const { value, error } = validateQuiz(req.body)
        if (error) {
            return res.status(421).json({ state: false, msg: error.details[0].message, innerData: null })
        }
        const updated = await Quizes.findByIdAndUpdate(req.params._id, value)
        res.status(200).json({ state: true, msg: "ma'lumot o'zgartirildi", data: updated })
    }
    catch {
        return res.status(400).json({ state: false, msg: "something went wrong", innerData: null })
    }
})




module.exports = router