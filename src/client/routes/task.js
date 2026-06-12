import { Router } from 'express'
import { nextId, tasks } from '../../data/tasks.js'
import { z } from 'zod'
import prisma from '../../lib/prisma.js';

const createtaskSchema = z.object({
    title: z.string().min(2, 'O título é obrigatório').max(30, 'O título deve ter no máximo 30 caracteres')
}) 

const router = Router()

router.get('/', async (req, res) => {
    const tasks = await prisma.task.findMany({
        orderBy: { createdAt: 'desc' }
    })
    res.json(tasks)
})

router.post('/', async (req, res) => {
    const result = createtaskSchema.safeParse(req.body)
    if (!result.success){
        return res.status(400).json({ errors: result.error.flatten()})
    }
    const task = await prisma.task.create({
        data: result.data
    })
    res.status(201).json(task)
})

router.put('/:id', async (req, res) => {
    const id = Number(req.params.id)
    try {
        const task = await prisma.task.update({
            where: { id },
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