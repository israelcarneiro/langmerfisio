import { Router } from 'express'
import multer from 'multer'
import uploadConfig from '../config/upload'

import ensureAuthenticated from '../middlewares/ensureAuthenticated'
import UpdateUserAvatarService from '../services/UpdateUserAvatarService'
import CreateUserService from '../services/CreateUserService'

const usersRouter = Router()
const upload = multer(uploadConfig)

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

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  async (request, response) => {
    try {
      const updateUserAvatar = new UpdateUserAvatarService()

      const user = await updateUserAvatar.execute({
        user_id: request.user.id,
        avatarFilename: request.file?.filename
      })

      // @ts-expect-error temporary delete operator
      delete user.password

      return response.json(user)
    } catch (err: any) {
      return response.status(400).json({ error: err.message })
    }
  }
)
export default usersRouter
