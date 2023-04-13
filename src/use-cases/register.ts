import { hash } from 'bcryptjs'
import { prisma } from 'src/lib/prisma'
import { PrismaUserRepository } from '../repositories/prisma-users-repository'

interface RegisterUseCaseRequest {
  name: string
  email: string
  password: string
}

export async function registerUseCase({
  name,
  email,
  password,
}: RegisterUseCaseRequest) {
  const passwordHash = await hash(password, 6)

  const userWithSameEmail = await prisma.user.findUnique({ where: { email } })

  if (userWithSameEmail) {
    throw new Error('E-mail already exists.')
  }

  const prismaUserRepository = new PrismaUserRepository()

  await prismaUserRepository.create({
    name,
    email,
    password_hash: passwordHash,
  })
}
