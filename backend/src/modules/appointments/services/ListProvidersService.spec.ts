import AppError from '@shared/errors/AppError'

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository'
import ListProvidersService from '../services/ListProvidersService'

let fakeUsersRepository: FakeUsersRepository
let listProviders: ListProvidersService

describe('ListProviders', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository()
    listProviders = new ListProvidersService(fakeUsersRepository)
  })

  it('should be able to list the providers except the provider logged', async () => {
    const anyUser1 = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123123',
      is_provider: true
    })

    const anyUser2 = await fakeUsersRepository.create({
      name: 'Jane Doe',
      email: 'janedoe@example.com',
      password: '123123',
      is_provider: true
    })

    const loggedUser = await fakeUsersRepository.create({
      name: 'John Roe',
      email: 'johnroe@example.com',
      password: '123123',
      is_provider: true
    })

    const providers = await listProviders.execute({
      user_id: loggedUser.id
    })

    expect(providers).toEqual([anyUser1, anyUser2])
  })

  it('should not be able to list anothers providers if the user is a provider', async () => {
    const loggedUser = await fakeUsersRepository.create({
      name: 'John Roe',
      email: 'johnroe@example.com',
      password: '123123',
      is_provider: true
    })

    await expect(
      listProviders.execute({
        user_id: loggedUser.id
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})
