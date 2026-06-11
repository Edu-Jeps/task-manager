import { Router } from 'express'
import { nextId, tasks } from '../../data/tasks.js'

const router = Router()

router.get('/', async (req, res) => {
    const tasks = await prisma.task.findMany({
        orderBy: { createdAt: 'desc' }
    })
    res.json(tasks)
})

router.post('/', async (req, res) => {
    const { title } = req.body
    const task = await prisma.task.create({
        data: { title }
    })
    res.status(201).json(task)
})

router.put('/:id', async (req, res) => {
    const id = Number(req.params.id)
    try {
        const task = await prisma.task.update({
            whrere: { id },
            data: req.body
        })
        res.json(task)
    } catch (error) {
        res.status(404).json({ error: 'Tarefa não encontrada' })
    }
})

router.delete('/:id', async (req, res) => {
    const id = Number(req.params.id)
    try {
        await prisma.task.delete({
            where: { id }
        })
        res.status(204).end()
    } catch (error) {
        res.status(404).json({ error: 'Tarefa não encontrada' })
    }
})

export default router