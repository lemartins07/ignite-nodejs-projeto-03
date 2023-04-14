import { prisma } from 'src/lib/prisma'
import { Prisma, User } from '@prisma/client'
import { UsersRepository } from '../iusers-repository'

export class PrismaUserRepository implements UsersRepository {
  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({ data })

    return user
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({ where: { email } })

    return user
  }

  async findById(id: string): Promise<User | null> {
    const user = await prisma.user.findFirst({ where: { id } })

    return user
  }
}
