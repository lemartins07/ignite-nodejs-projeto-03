import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { PrismaUserRepository } from '../../repositories/prisma/prisma-users-repository'
import { AuthenticateUseCase } from 'src/use-cases/authenticate'
import InvalidCredentialsError from 'src/use-cases/errors/invalid-credentials-error'

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { email, password } = authenticateBodySchema.parse(request.body)

  try {
    const userRepository = new PrismaUserRepository()
    const authenticateUseCase = new AuthenticateUseCase(userRepository)

    await authenticateUseCase.execute({ email, password })
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return reply.status(400).send({ message: error.message })
    }

    return reply.status(500).send() // TODO: fix me
  }

  return reply.status(200).send()
}
