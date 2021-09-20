import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository'
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider'
import UpdateProfileService from './UpdateProfileService'
import AppError from '@shared/errors/AppError'

let fakeUsersRepository: FakeUsersRepository
let fakeHashProvider: FakeHashProvider
let updateProfile: UpdateProfileService

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository()
    fakeHashProvider = new FakeHashProvider()
    updateProfile = new UpdateProfileService(
      fakeUsersRepository,
      fakeHashProvider
    )
  })

  it('should be able to update a profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123123'
    })

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'Jane Doe',
      email: 'janedoe@example.com'
    })

    expect(updatedUser.name).toBe('Jane Doe')
    expect(updatedUser.email).toBe('janedoe@example.com')
  })

  it('should not be able to update the profile using an email address from another user', async () => {
    await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123123'
    })

    const user = await fakeUsersRepository.create({
      name: 'Jane Doe',
      email: 'janedoe@example.com',
      password: '123123'
    })

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'Jane Doe',
        email: 'johndoe@example.com'
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should be able to update the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456'
    })

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'John doe',
      email: 'johndoe@example.com',
      old_password: '123456',
      password: '123123'
    })

    expect(updatedUser.password).toBe('123123')
  })

  it('should not be able to update the password without old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123123'
    })

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: '123456'
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to update the password with the wrong old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123123'
    })

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'John Doe',
        email: 'johndoe@example.com',
        old_password: 'wrong-old-password',
        password: '123456'
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})
