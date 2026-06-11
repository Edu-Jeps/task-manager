import { Router } from 'express'
import { nextId, tasks } from '../data/tasks.js'

const router = Router()

router.get('/', (req, res) => {
    res.json(tasks)
})

router.post('/', (req, res) => {
    const { title } = req.body
    const task = { id: nextId(), title, done: false }
    tasks.push(task)
    res.status(201).json(task)
})

router.put('/:id', (req, res) => {
  const task = tasks.find(t => t.id === Number(req.params.id))
  if (!task) return res.status(404).json({ error: 'Tarefa não encontrada' })
  Object.assign(task, req.body)
  res.json(task)
})

router.delete('/:id', (req, res) => {
    const index = tasks.findIndex(t => t.id === Number(req.params.id))
    if (index === -1) return res.status(404).json({ error: 'Tarefa não encontrada'})
    tasks.splice(index, 1)
    res.status(204).end()
})

export default router