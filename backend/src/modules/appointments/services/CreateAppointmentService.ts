import { startOfHour, isBefore, getHours, format } from 'date-fns'
import { injectable, inject } from 'tsyringe'

import AppError from '@shared/errors/AppError'
import Appointment from '../infra/typeorm/entities/Appointment'
import IUsersRepository from '@modules/users/repositories/IUsersRepository'
import IAppointmentsRepository from '../repositories/IAppointmentsRepository'
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider'

interface IRequest {
  provider_id: string
  user_id: string
  observation?: string
  date: Date
}

@injectable()
class CreateAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider
  ) {}

  public async execute({
    provider_id,
    user_id,
    observation,
    date
  }: IRequest): Promise<Appointment> {
    const appointmentDate = startOfHour(date)

    if (isBefore(appointmentDate, Date.now())) {
      throw new AppError("You can't create an appointment in a past date.")
    }

    if (user_id === provider_id) {
      throw new AppError("You can't create an appointment with yourself.")
    }

    if (getHours(appointmentDate) < 8 || getHours(appointmentDate) > 17) {
      throw new AppError('You can only create appointments between 8am and 5pm')
    }

    const findAppointmentInSameDate =
      await this.appointmentsRepository.findByDate(appointmentDate)

    if (findAppointmentInSameDate) {
      throw new AppError('The appointment hour is not available.')
    }

    const userProvider = await this.usersRepository.findById(provider_id)
    const userLogged = await this.usersRepository.findById(user_id)

    if (userProvider && userLogged) {
      if (
        userProvider.is_provider === false &&
        userLogged.is_provider === false
      ) {
        throw new AppError(
          'Patients cannot create appointment with another patients.',
          401
        )
      }

      if (
        userProvider.is_provider === true &&
        userLogged.is_provider === true
      ) {
        throw new AppError(
          'Providers cannot create appointment to anothers providers.',
          401
        )
      }
    }

    const appointment = await this.appointmentsRepository.create({
      provider_id,
      user_id,
      observation,
      date: appointmentDate
    })

    await this.cacheProvider.invalidate(
      `provider-appointments:${provider_id}:${format(
        appointmentDate,
        'yyyy-M-d'
      )}`
    )

    return appointment
  }
}

export default CreateAppointmentService
