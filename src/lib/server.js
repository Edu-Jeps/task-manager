import express from 'express'
import taskRoutes from '../client/routes/task.js'
import authRoutes from '../client/routes/auth.js'
import 'dotenv/config'
import { errorHandler } from '../middleware/errorHandler.js'
import rateLimit from 'express-rate-limit'

const app = express()

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 10, // Limite de 10 requisições por IP
    message: { error: 'Muitas requisições, por favor tente novamente mais tarde.' }
})

app.use(limiter)
app.use(express.json())
app.use('/tasks', taskRoutes)
app.use('/auth', authRoutes)
app.use(errorHandler)


app.listen(3000, () => {
    console.log('Servidor rodando')
})

