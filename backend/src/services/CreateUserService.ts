import { getRepository } from 'typeorm'
import User from '../models/User'

interface Request {
  name: string
  email: string
  password: string
  is_provider?: boolean
}

class CreateUserService {
  public async execute({
    name,
    email,
    password,
    is_provider
  }: Request): Promise<User> {
    const usersRepository = getRepository(User)

    const checkUsersExists = await usersRepository.findOne({
      where: { email }
    })

    if (checkUsersExists) {
      throw new Error('Email address already used.')
    }

    const user = usersRepository.create({
      name,
      email,
      password,
      is_provider
    })

    await usersRepository.save(user)

    return user
  }
}

export default CreateUserService
