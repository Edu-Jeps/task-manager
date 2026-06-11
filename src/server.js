import express from 'express'
import taskRoutes from './routes/task.js'

const app = express()
app.use(express.json())
app.use('/tasks', taskRoutes)

app.listen(3000, () => {
    console.log('Servidor rodando')
})

