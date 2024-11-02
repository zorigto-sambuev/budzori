const express = require("express")
const mongoose = require("mongoose")
const config = require("config")
const authRouter = require("./routes/auth.routes")
const app = express()
const PORT = config.get('serverPort')

app.use(express.json())
app.use("/api/auth", authRouter)

const start = async () => {
    try {
        await mongoose.connect(config.get("mongoUri"),{
          useNewUrlParser:true,
          useUnifiedTopology:true
        })

        app.listen(PORT, () => {
          console.log('Server has been started', PORT);
        })
    } catch (e) {
        console.log(e)
    }
}

start();