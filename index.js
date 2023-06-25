const express = require('express')
const cors = require("cors")
const { mongoose } = require('mongoose')
const app = express()
const { config } = require("dotenv");

// uses
app.use(express.json())
app.use(cors())
config()


app.get("/", async (req, res) => {
    res.json("app is run")
})


mongoose.connect(process.env.DATABASE)
    .then(() => console.log("MongoDB is connected"))
    .catch(() => console.log("MongoDB is not connected"));


//=========== ROUTES ==========
const quiz = require('./routes/quiz')

//=========== ENTPOINTS ==========

app.use("/quizes", quiz)


const PORT = process.env.PORT || 8000
app.listen(PORT, () => { console.log(PORT + "listening") })

