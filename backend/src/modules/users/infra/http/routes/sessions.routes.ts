import { Router } from 'express'
import { container } from 'tsyringe'

import AuthenticateUserService from '@modules/users/services/AuthenticateUserService'

const sessionsRouter = Router()

sessionsRouter.post('/', async (request, response) => {
  const { email, password } = request.body

  const authenticateUserService = container.resolve(AuthenticateUserService)

  const { user, token } = await authenticateUserService.execute({
    email,
    password
  })

  // @ts-expect-error temporary delete operator
  delete user.password

  return response.json({ user, token })
})

export default sessionsRouter