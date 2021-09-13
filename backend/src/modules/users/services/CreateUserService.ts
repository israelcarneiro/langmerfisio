import { hash } from 'bcryptjs'

import AppError from '@shared/errors/AppError'
import IUsersRepository from '../repositories/IUsersRepository'
import User from '@modules/users/infra/typeorm/entities/User'

interface IRequest {
  name: string
  email: string
  password: string
  is_provider?: boolean
}

class CreateUserService {
  constructor(private usersRepository: IUsersRepository) {}

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

    const hashedPassword = await hash(password, 8)

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
