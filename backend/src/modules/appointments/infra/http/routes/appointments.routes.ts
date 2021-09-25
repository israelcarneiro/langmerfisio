import { Router } from 'express'
import { celebrate, Segments, Joi } from 'celebrate'

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated'
import AppoinmentsController from '../controllers/AppointmentsController'
import ProviderAppointmentsController from '../controllers/ProviderAppointmentsController'

const appointmentsRouter = Router()
const appointmentsController = new AppoinmentsController()
const providerAppointmentsController = new ProviderAppointmentsController()

appointmentsRouter.use(ensureAuthenticated)

appointmentsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      provider_id: Joi.string().uuid().required(),
      user_id: Joi.string().uuid().required(),
      date: Joi.date(),
      observation: Joi.string().default('Sem observações').empty('').optional()
    }
  }),
  appointmentsController.create
)
appointmentsRouter.get('/me', providerAppointmentsController.index)

export default appointmentsRouter
