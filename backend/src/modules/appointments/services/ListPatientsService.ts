import { injectable, inject } from 'tsyringe'

import IUsersRepository from '@modules/users/repositories/IUsersRepository'
import User from '@modules/users/infra/typeorm/entities/User'
import AppError from '@shared/errors/AppError'

interface IRequest {
  user_id: string
}

@injectable()
class ListPatientsService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  public async execute({ user_id }: IRequest): Promise<User[]> {
    const user = await this.usersRepository.findById(user_id)

    if (user && user.is_provider === false) {
      throw new AppError('Patients does not list anothers patients', 401)
    }

    const users = await this.usersRepository.findAllPatients({
      except_user_id: user_id
    })

    return users
  }
}

export default ListPatientsService
