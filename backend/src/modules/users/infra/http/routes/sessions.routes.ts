import { Router } from 'express'

import AuthenticateUserService from '@modules/users/services/AuthenticateUserService'
import UsersRepository from '../../typeorm/repositories/UsersRepository'

const sessionsRouter = Router()

sessionsRouter.post('/', async (request, response) => {
  const { email, password } = request.body

  const usersRepository = new UsersRepository()
  const authenticateUserService = new AuthenticateUserService(usersRepository)

  const { user, token } = await authenticateUserService.execute({
    email,
    password
  })

  // @ts-expect-error temporary delete operator
  delete user.password

  return response.json({ user, token })
})

export default sessionsRouter
