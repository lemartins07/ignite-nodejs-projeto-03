import { it, expect, describe, beforeEach } from 'vitest'
import { hash } from 'bcryptjs'
import InMemoryUserRepository from 'src/repositories/in-memory/in-memory-users-repository'
import { GetUserProfileUseCase } from './get-user-profile'
import ResourceNotFoundError from './errors/resource-not-found'

let usersRepository: InMemoryUserRepository
let sut: GetUserProfileUseCase

describe('Get User Profile Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUserRepository()
    sut = new GetUserProfileUseCase(usersRepository)
  })

  it('should be able to get user profile', async () => {
    const createdUser = await usersRepository.create({
      name: 'Jhon Doe',
      email: 'jhondoe@test.com',
      password_hash: await hash('123456', 6),
    })

    const { user } = await sut.execute({ id: createdUser.id })

    expect(user.id).toEqual(createdUser.id)
  })

  it('should not be able to get user profile with wrong id', async () => {
    await usersRepository.create({
      name: 'Jhon Doe',
      email: 'jhondoe@test.com',
      password_hash: await hash('123456', 6),
    })

    expect(() => sut.execute({ id: 'non-existing-id' })).rejects.toBeInstanceOf(
      ResourceNotFoundError,
    )
  })
})
