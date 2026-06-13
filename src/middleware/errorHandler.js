export function errorHandler(err, req, res, next) {
    console.error(err)

    // Erros do Prisma
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    switch (err.code) {
      case 'P2002':
        return res.status(409).json({
          error: 'Registro já existe'
        });

      case 'P2025':
        return res.status(404).json({
          error: 'Registro não encontrado'
        });

      default:
        return res.status(400).json({
          error: 'Erro no banco de dados'
        });
    }
  }

  // Erros de validação
  if (err.name === 'ZodError') {
    return res.status(400).json({
      error: 'Dados inválidos',
      details: err.flatten()
    });
  }

  // JWT
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({
      error: 'Token inválido'
    });
  }

  if (err.name === 'TokenExpiredError') {
    return res.status(401).json({
      error: 'Token expirado'
    });
  }

  // Fallback
  return res.status(500).json({
    error: 'Erro interno do servidor'
  });


}