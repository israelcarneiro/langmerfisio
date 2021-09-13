import { Router } from 'express'
import { container } from 'tsyringe'
import multer from 'multer'
import uploadConfig from '@config/upload'

import ensureAuthenticated from '../middlewares/ensureAuthenticated'
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService'
import CreateUserService from '@modules/users/services/CreateUserService'

const usersRouter = Router()
const upload = multer(uploadConfig)

usersRouter.post('/', async (request, response) => {
  const { name, email, password, is_provider } = request.body

  const createUser = container.resolve(CreateUserService)

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
    const updateUserAvatar = container.resolve(UpdateUserAvatarService)

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
