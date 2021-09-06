import { Router } from 'express'
import { v4 } from 'uuid'

const appointmentsRouter = Router()

const appointments = []

appointmentsRouter.post('/', (request, response) => {
  const { provider, date } = request.body

  console.log(provider)

  const appointment = {
    id: v4(),
    provider,
    date
  }

  appointments.push(appointment)

  console.log(appointments)

  return response.json(appointment)
})

export default appointmentsRouter
