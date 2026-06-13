import { Router } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from '../../lib/prisma.js';

const router = Router()

router.post('/register', async (req, res) => {
    const {email, password} = req.body;

    const exist = await prisma.user.findUnique({where: {email}})
    if (exist) return res.status(409).json({ error: 'Email já cadastrado'})
    
    const hash = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({ 
        data: {email, password: hash}
    })

    res.status(201).json({ message: 'Usuário criado com sucesso', user: {id: user.id, email: user.email}})
})

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email }})
    if (!user) return res.status(404).json({ error: 'Usuário não encontrado'})

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ error: 'Senha incorreta'})

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ message: 'Login bem-sucedido', token })
})

export default router;