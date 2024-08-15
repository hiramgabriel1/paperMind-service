import express from "express"
import morgan from "morgan"
import cors from "cors"
import dotenv from "dotenv"
import rateLimit from "express-rate-limit"
import colors from "colors"
import chatRouter from "./routes/chat.router"
import userRouter from "./routes/user.router"

dotenv.config()

const PORT = process.env.PORT
const app = express()
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 40,
    message: 'too many request!',
})

app.disable('x-powered-by');

app.use(limiter)
app.use(morgan("dev"))
app.use(express.json())
app.use(cors({
    origin: '*'
}))

app.use(chatRouter)
app.use(userRouter)

const bootstrap = async () => {
    console.log(colors.blue('all okay ppi:)'));
    
    app.listen(PORT)
}

bootstrap()