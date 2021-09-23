import { Router } from 'express'
import { celebrate, Segments, Joi } from 'celebrate'

import SessionsControllers from '../controllers/SessionsControllers'

const sessionsRouter = Router()
const sessionsController = new SessionsControllers()

sessionsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().required()
    }
  }),
  sessionsController.create
)

export default sessionsRouter
