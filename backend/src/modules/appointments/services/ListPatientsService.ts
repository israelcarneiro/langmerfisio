import { injectable, inject } from 'tsyringe'

import IUsersRepository from '@modules/users/repositories/IUsersRepository'
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider'
import User from '@modules/users/infra/typeorm/entities/User'
import AppError from '@shared/errors/AppError'

interface IRequest {
  user_id: string
}

@injectable()
class ListPatientsService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider
  ) {}

  public async execute({ user_id }: IRequest): Promise<User[]> {
    // let users = await this.cacheProvider.recover<User[]>(
    //   `patients-list:${user_id}`
    // )

    let users

    if (!users) {
      const user = await this.usersRepository.findById(user_id)

      if (user && user.is_provider === false) {
        throw new AppError('Patients does not list anothers patients', 401)
      }

      users = await this.usersRepository.findAllPatients({
        except_user_id: user_id
      })

      await this.cacheProvider.save(`patients-list:${user_id}`, users)
    }

    return users
  }
}

export default ListPatientsService
