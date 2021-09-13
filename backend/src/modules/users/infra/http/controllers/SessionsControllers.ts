import { Request, Response } from 'express'
import { container } from 'tsyringe'

import AuthenticateUserService from '@modules/users/services/AuthenticateUserService'

export default class SessionsControllers {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body

    const authenticateUserService = container.resolve(AuthenticateUserService)

    const { user, token } = await authenticateUserService.execute({
      email,
      password
    })

    // @ts-expect-error temporary delete operator
    delete user.password

    return response.json({ user, token })
  }
}
