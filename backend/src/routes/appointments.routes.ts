import { Router } from 'express'
import { parseISO } from 'date-fns'
import { getCustomRepository } from 'typeorm'

import ensureAuthenticated from '../middlewares/ensureAuthenticated'
import AppointmentsRepository from '../repositories/AppointmentRepository'
import CreateAppointmentService from '../services/CreateAppointmentService'

const appointmentsRouter = Router()

appointmentsRouter.use(ensureAuthenticated)

appointmentsRouter.post('/', async (request, response) => {
  const { provider_id, date } = request.body

  const parsedDate = parseISO(date)

  const createAppointment = new CreateAppointmentService()

  const appointment = await createAppointment.execute({
    provider_id,
    date: parsedDate
  })
  return response.json(appointment)
})

appointmentsRouter.get('/', async (request, response) => {
  const appointmentsRepository = getCustomRepository(AppointmentsRepository)

  const appointments = await appointmentsRepository.find()

  return response.json(appointments)
})

export default appointmentsRouter
