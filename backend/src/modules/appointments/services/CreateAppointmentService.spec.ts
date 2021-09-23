import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository'
import AppError from '@shared/errors/AppError'
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository'
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider'
import CreateAppointmentService from './CreateAppointmentService'

let fakeAppointmentsRepository: FakeAppointmentsRepository
let fakeUsersRepository: FakeUsersRepository
let fakeCacheProvider: FakeCacheProvider
let createAppointment: CreateAppointmentService

describe('CreateAppointments', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository()
    fakeUsersRepository = new FakeUsersRepository()
    fakeCacheProvider = new FakeCacheProvider()
    createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
      fakeUsersRepository,
      fakeCacheProvider
    )
  })
  it('should be able to create a new appointment', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2021, 8, 20, 12).getTime()
    })

    const appointment = await createAppointment.execute({
      date: new Date(2021, 8, 20, 13),
      user_id: 'any_user_id',
      provider_id: 'any_provider_id'
    })

    expect(appointment).toHaveProperty('id')
    expect(appointment.provider_id).toBe('any_provider_id')
  })

  it('should be not able to create two appointments on the same time', async () => {
    const appointmentDate = new Date(2021, 10, 10, 11)

    await createAppointment.execute({
      date: appointmentDate,
      user_id: 'any_user_id',
      provider_id: 'any_provider_id'
    })

    await expect(
      createAppointment.execute({
        date: appointmentDate,
        user_id: 'any_user_id',
        provider_id: 'any_provider_id'
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to patients create appointments to another pacients', async () => {
    const appointmentDate = new Date(2021, 10, 10, 11)

    const user1 = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123123',
      is_provider: false
    })

    const user2 = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123123',
      is_provider: false
    })

    await expect(
      createAppointment.execute({
        date: appointmentDate,
        user_id: user1.id,
        provider_id: user2.id
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to provider create appointments to another providers', async () => {
    const appointmentDate = new Date(2021, 10, 10, 11)

    const user1 = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123123',
      is_provider: true
    })

    const user2 = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123123',
      is_provider: true
    })

    await expect(
      createAppointment.execute({
        date: appointmentDate,
        user_id: user1.id,
        provider_id: user2.id
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to create an appointment on a past date', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2021, 8, 20, 12).getTime()
    })

    await expect(
      createAppointment.execute({
        date: new Date(2021, 8, 20, 10),
        user_id: 'any_user_id',
        provider_id: 'any_provider_id'
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to create an appointment with same user as provider', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2021, 8, 20, 12).getTime()
    })

    await expect(
      createAppointment.execute({
        date: new Date(2021, 8, 20, 13),
        user_id: 'any_id',
        provider_id: 'any_id'
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to create an appointment before 8am and after 5pm', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2021, 8, 20, 12).getTime()
    })

    await expect(
      createAppointment.execute({
        date: new Date(2021, 8, 21, 7),
        user_id: 'any_id',
        provider_id: 'any_provider_id'
      })
    ).rejects.toBeInstanceOf(AppError)
    await expect(
      createAppointment.execute({
        date: new Date(2021, 8, 21, 18),
        user_id: 'any_id',
        provider_id: 'any_provider_id'
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})
