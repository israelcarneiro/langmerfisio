import { Router } from 'express'
import { startOfHour, parseISO } from 'date-fns'

import AppointmentsRepository from '../repositories/AppointmentRepository'

const appointmentsRouter = Router()

// instance object
const appointmentsRepository = new AppointmentsRepository()

appointmentsRouter.post('/', (request, response) => {
  const { provider, date } = request.body

  // get full hour and parse to date Object

  const parsedDate = startOfHour(parseISO(date))

  // should able to create one appointment per hour

  const findAppointmentInSameDate =
    appointmentsRepository.findByDate(parsedDate)

  if (findAppointmentInSameDate) {
    return response
      .status(400)
      .json({ error: 'The appointmente hour is not available.' })
  }

  const appointment = appointmentsRepository.create(provider, parsedDate)

  return response.json(appointment)
})

export default appointmentsRouter
