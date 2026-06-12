import { Router } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { prisma } from '../../lib/prisma';

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