import { Router } from 'express'
import { parseISO } from 'date-fns'

import AppointmentsRepository from '../repositories/AppointmentRepository'
import CreateAppointmentService from '../services/CreateAppointmentService'

const appointmentsRouter = Router()

// instance object
const appointmentsRepository = new AppointmentsRepository()

appointmentsRouter.post('/', (request, response) => {
  try {
    const { provider, date } = request.body

    // get full hour and parse to date Object

    const parsedDate = parseISO(date)

    const createAppointment = new CreateAppointmentService(
      appointmentsRepository
    )

    const appointment = createAppointment.execute({
      provider,
      date: parsedDate
    })
    return response.json(appointment)
  } catch (err: any) {
    return response.status(400).json({ error: err.message })
  }
})

appointmentsRouter.get('/', (request, response) => {
  const appointments = appointmentsRepository.all()

  return response.json(appointments)
})

export default appointmentsRouter
