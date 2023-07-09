const { Router } = require('express')
const router = Router()
const { History, validateHistory } = require('../models/historyModel')

// GET
router.get('/', async (req, res) => {
    try {
        const history = await History.find()
        if (!history.length) {
            return res.status(404).json({ state: false, msg: "Data is not defined", innerData: null })
        }
        res.status(200).json({ state: true, msg: "All history", innerData: history })
    }

    catch {
        res.status(500).json({ state: false, msg: "Server error", innerData: null })
    }
})


// POST
router.post('/', async (req, res) => {
    try {
        const { value, error } = validateHistory(req.body)
        if (error) {
            return res.status(421).json({ state: false, msg: error.details[0].message, innerData: null })
        }

        const newHistory = await History.create(value)
        const savedHistory = await newHistory.save()
        res.status(201).json({ state: true, msg: "ma'lumot saqlandi", innerData: savedHistory })
    }
    catch {
        return res.status(400).json({ state: false, msg: "something went wrong", innerData: null })
    }
})


// DELETE ALL

router.delete('/deleteAll', async (req, res) => {
    try {
        const deleteAll = await History.deleteMany({})

        res.status(200).json({ state: true, msg: "o'chirildi", innerData: deleteAll })
    }
    catch {
        return res.status(400).json({ state: false, msg: "something went wrong", innerData: null })
    }
})

module.exports = router