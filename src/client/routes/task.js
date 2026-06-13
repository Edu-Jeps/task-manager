import { Router } from 'express'
import { nextId, tasks } from '../../data/tasks.js'
import { z } from 'zod'
import prisma from '../../lib/prisma.js';
import { authenticate } from '../../middleware/auth.js'

const createtaskSchema = z.object({
    title: z.string().min(2, 'O título é obrigatório').max(30, 'O título deve ter no máximo 30 caracteres')
}) 

const router = Router()

router.use(authenticate)

router.get('/', async (req, res) => {
    const tasks = await prisma.task.findMany({
        where: { userId: req.userId.id },
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
        data: {
            ...result.data,
            userId: req.userId.id
        }
    })
    res.status(201).json(task)
})

router.put('/:id', async (req, res) => {
    const task = await prisma.task.findFirst({
        where: { id: Number(req.params.id), userId: req.userId.id }
    })

    if (!task) return res.status(404).json({ error: 'Tarefa não encontrada'})

    try {
        const atualiza = await prisma.task.update({
            where: { id },
            data: req.body
        })
        res.json(atualiza)
    } catch (error) {
        res.status(404).json({ error: 'Tarefa não encontrada' })
    }
})


router.delete('/:id', async (req, res) => {
  const task = await prisma.task.findFirst({
    where: { id: Number(req.params.id), userId: req.user.id }
  })
  if (!task) return res.status(404).json({ error: 'Task não encontrada' })

  await prisma.task.delete({ where: { id: task.id } })
  res.json({ message: 'Deletada' })
})

export default router