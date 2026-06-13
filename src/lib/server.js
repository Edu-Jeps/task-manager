import express from 'express'
import taskRoutes from '../client/routes/task.js'
import authRoutes from '../client/routes/auth.js'
import 'dotenv/config'

const app = express()
app.use(express.json())
app.use('/tasks', taskRoutes)
app.use('/auth', authRoutes)

app.listen(3000, () => {
    console.log('Servidor rodando')
})

