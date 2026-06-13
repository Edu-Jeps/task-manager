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

// tasks?page=1&limit=10&done=false
router.get('/', async (req, res) => {
    const page = Math.max(1, Number(req.query.page) || 1)
    const limit = Math.max(50, Number(req.query.limit) || 10)
    const skip = (page - 1) * limit

    //filtro opcional por status
    const where = { userId: req.userId.id }
    if (req.query.done !== undefined){  
        where.done = req.query.done === 'true'
    }

    const [tasks, total] = await Promise.all([
        prisma.task.findMany({ where, skip, take: limit, orderBy: { createdAt: 'desc'} }),
        prisma.task.count({ where })])


    res.json({
        data: tasks,
        meta: {
            page, limit, total, pages: Math.ceil(total / limit)
        }
    })
})

router.post('/', async (req, res, next) => {
    const result = createtaskSchema.safeParse(req.body)
    if (!result.success){
        return res.status(400).json({ errors: result.error.flatten()})
    }

    try{
        const task = await prisma.task.create({
            data: {
                ...result.data,
                userId: req.userId.id
            }
        })
        res.status(201).json(task)
    } catch (error) {
        next(error)
    }
})

router.put('/:id', async (req, res, next) => {

    const id = Number(req.params.id)
    
    const task = await prisma.task.findFirst({
        where: { id: id, userId: req.userId.id }
    })

    if (!task) return res.status(404).json({ error: 'Tarefa não encontrada'})

    try {
        const atualiza = await prisma.task.update({
            where: { id },
            data: req.body
        })
        res.json(atualiza)
    } catch (error) {
        next(error)
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