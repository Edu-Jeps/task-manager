import { Router } from 'express'
import { nextId, tasks } from '../data/tasks.js'

const router = Router()

router.get('/', (req, res) => {
    res.json(tasks)
})

router.post('/', (req, res) => {
    const { title } = req.body
    const task = { id: nextId(), titile, done: false }
    task.push(task)
    res.status.json(task)
})

export default router