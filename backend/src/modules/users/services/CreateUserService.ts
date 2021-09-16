import { injectable, inject } from 'tsyringe'

import AppError from '@shared/errors/AppError'
import IUsersRepository from '../repositories/IUsersRepository'
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider'
import User from '@modules/users/infra/typeorm/entities/User'

interface IRequest {
  name: string
  email: string
  password: string
  is_provider?: boolean
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider
  ) {}

  public async execute({
    name,
    email,
    password,
    is_provider
  }: IRequest): Promise<User> {
    const checkUsersExists = await this.usersRepository.findByEmail(email)

    if (checkUsersExists) {
      throw new AppError('Email address already used.')
    }

    const hashedPassword = await this.hashProvider.generateHash(password)

    const user = await this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
      is_provider
    })

    return user
  }
}

export default CreateUserService
