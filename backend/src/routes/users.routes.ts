import { Router } from 'express'
import CreateUserService from '../services/CreateUserService'

const usersRouter = Router()

usersRouter.post('/', async (request, response) => {
  try {
    const { name, email, password, is_provider } = request.body

    const createUser = new CreateUserService()

    const user = await createUser.execute({
      name,
      email,
      password,
      is_provider
    })

    // @ts-expect-error temporary delete operator
    delete user.password

    return response.json(user)
  } catch (err: any) {
    return response.status(400).json({ error: err.message })
  }
})

export default usersRouter
