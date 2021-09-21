// import AppError from '@shared/errors/AppError'

import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository'
import ListProviderDayAvailabilityService from './ListProviderDayAvailabilityService'

let fakeAppointmentsRepository: FakeAppointmentsRepository
let listProviderDayAvailability: ListProviderDayAvailabilityService

describe('ListProviderDayAvailability', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository()
    listProviderDayAvailability = new ListProviderDayAvailabilityService(
      fakeAppointmentsRepository
    )
  })

  it('should be able to list the day availability from provider', async () => {
    await fakeAppointmentsRepository.create({
      provider_id: 'any_provider_id',
      date: new Date(2021, 8, 20, 8, 0, 0)
    })

    await fakeAppointmentsRepository.create({
      provider_id: 'any_provider_id',
      date: new Date(2021, 8, 20, 10, 0, 0)
    })

    const availability = await listProviderDayAvailability.execute({
      provider_id: 'any_provider_id',
      year: 2021,
      month: 9,
      day: 20
    })

    expect(availability).toEqual(
      expect.arrayContaining([
        { hour: 8, available: false },
        { hour: 9, available: true },
        { hour: 10, available: false },
        { hour: 11, available: true }
      ])
    )
  })
})
