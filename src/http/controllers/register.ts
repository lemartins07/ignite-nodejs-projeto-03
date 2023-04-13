import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { RegisterUseCase } from 'src/use-cases/register'
import { PrismaUserRepository } from '../../repositories/prisma/prisma-users-repository'
import UserAlredyExitsError from 'src/use-cases/errors/user-already-exists-error'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { name, email, password } = registerBodySchema.parse(request.body)

  try {
    const userRepository = new PrismaUserRepository()
    const registerUseCase = new RegisterUseCase(userRepository)

    await registerUseCase.execute({ name, email, password })
  } catch (error) {
    if (error instanceof UserAlredyExitsError) {
      return reply.status(409).send({ message: error.message })
    }

    return reply.status(500).send() // TODO: fix me
  }

  return reply.status(201).send()
}
