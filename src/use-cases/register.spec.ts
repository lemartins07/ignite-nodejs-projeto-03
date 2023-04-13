import { it, expect, describe } from 'vitest'
import { RegisterUseCase } from './register'
import { compare } from 'bcryptjs'

describe('Register Use Case', () => {
  it('should hash user password upon registration', async () => {
    const registerUseCase = new RegisterUseCase({
      async findByEmail(email) {
        return null
      },

      async create(data) {
        return {
          id: 'id-1',
          name: data.name,
          email: data.email,
          password_hash: data.password_hash,
          created_at: data.created_at,
        }
      },
    })

    const { user } = await registerUseCase.execute({
      name: 'Jhon Doe',
      email: 'jhondoe@test.com',
      password: '123456',
    })

    const isPasswordCorrectlyHashed = await compare(
      '123456',
      user.password_hash,
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })
})
