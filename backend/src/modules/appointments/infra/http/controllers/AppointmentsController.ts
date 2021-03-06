import { Request, Response } from 'express'

import { container } from 'tsyringe'

import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService'

export default class AppoinmentsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { provider_id, user_id, observation, date } = request.body

    const createAppointment = container.resolve(CreateAppointmentService)

    const appointment = await createAppointment.execute({
      provider_id,
      user_id,
      observation,
      date
    })
    return response.json(appointment)
  }
}
