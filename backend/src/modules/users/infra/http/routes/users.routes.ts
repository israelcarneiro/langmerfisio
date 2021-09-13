import { Router } from 'express'
import multer from 'multer'
import uploadConfig from '@config/upload'

import ensureAuthenticated from '../middlewares/ensureAuthenticated'
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService'
import CreateUserService from '@modules/users/services/CreateUserService'
import UsersRepository from '../../typeorm/repositories/UsersRepository'

const usersRouter = Router()
const upload = multer(uploadConfig)

usersRouter.post('/', async (request, response) => {
  const { name, email, password, is_provider } = request.body

  const usersRepository = new UsersRepository()
  const createUser = new CreateUserService(usersRepository)

  const user = await createUser.execute({
    name,
    email,
    password,
    is_provider
  })

  // @ts-expect-error temporary delete operator
  delete user.password

  return response.json(user)
})

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  async (request, response) => {
    const usersRepository = new UsersRepository()
    const updateUserAvatar = new UpdateUserAvatarService(usersRepository)

    const user = await updateUserAvatar.execute({
      user_id: request.user.id,
      avatarFilename: request.file?.filename
    })

    // @ts-expect-error temporary delete operator
    delete user.password

    return response.json(user)
  }
)
export default usersRouter
