import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider'
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository'
import ListProviderAppointmentsService from './ListProviderAppointmentsService'

let fakeAppointmentsRepository: FakeAppointmentsRepository
let fakeCacheProvider: FakeCacheProvider
let listProviderAppointments: ListProviderAppointmentsService

describe('ListProviderAppointments', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository()
    fakeCacheProvider = new FakeCacheProvider()
    listProviderAppointments = new ListProviderAppointmentsService(
      fakeAppointmentsRepository,
      fakeCacheProvider
    )
  })

  it('should be able to list the apppointments on a specific day from provider', async () => {
    const appointment1 = await fakeAppointmentsRepository.create({
      provider_id: 'any_provider_id',
      user_id: 'any_user_id',
      date: new Date(2021, 8, 20, 14, 0, 0)
    })

    const appointment2 = await fakeAppointmentsRepository.create({
      provider_id: 'any_provider_id',
      user_id: 'any_user_id',
      date: new Date(2021, 8, 20, 15, 0, 0)
    })

    const availability = await listProviderAppointments.execute({
      provider_id: 'any_provider_id',
      year: 2021,
      month: 9,
      day: 20
    })

    expect(availability).toEqual([appointment1, appointment2])
  })
})
