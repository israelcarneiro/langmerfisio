import { Request, Response } from 'express'

import { container } from 'tsyringe'

import ListPatientsService from '@modules/appointments/services/ListPatientsService'

export default class ProvidersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id

    const listPatients = container.resolve(ListPatientsService)

    const patients = await listPatients.execute({ user_id })
    return response.json(patients)
  }
}
