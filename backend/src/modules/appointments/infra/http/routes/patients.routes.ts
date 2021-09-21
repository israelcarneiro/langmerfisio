import { Router } from 'express'

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated'
import PatientsController from '../controllers/PatientsController'

const patientsRouter = Router()
const patientsController = new PatientsController()

patientsRouter.use(ensureAuthenticated)

patientsRouter.get('/', patientsController.index)

export default patientsRouter
