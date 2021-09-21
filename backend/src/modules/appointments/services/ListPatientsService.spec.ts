// import AppError from '@shared/errors/AppError'

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository'
import ListPatientsService from '../services/ListPatientsService'

let fakeUsersRepository: FakeUsersRepository
let listPatients: ListPatientsService

describe('ListPatients', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository()
    listPatients = new ListPatientsService(fakeUsersRepository)
  })

  it('should be able to list the patients except the patient logged', async () => {
    const anyUser1 = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123123',
      is_provider: false
    })

    const anyUser2 = await fakeUsersRepository.create({
      name: 'Jane Doe',
      email: 'janedoe@example.com',
      password: '123123',
      is_provider: false
    })

    const loggedUser = await fakeUsersRepository.create({
      name: 'John Roe',
      email: 'johnroe@example.com',
      password: '123123',
      is_provider: true
    })

    const patients = await listPatients.execute({
      user_id: loggedUser.id
    })

    expect(patients).toEqual([anyUser1, anyUser2])
  })
})
