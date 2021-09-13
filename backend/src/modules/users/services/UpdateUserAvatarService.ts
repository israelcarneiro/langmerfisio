import path from 'path'
import fs from 'fs'
import { injectable, inject } from 'tsyringe'

import uploadConfig from '@config/upload'
import User from '@modules/users/infra/typeorm/entities/User'
import AppError from '@shared/errors/AppError'
import IUsersRepository from '../repositories/IUsersRepository'

interface IRequest {
  user_id: string
  avatarFilename: string | undefined
}

@injectable()
class UpdateUserAvatarService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  public async execute({ user_id, avatarFilename }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id)

    if (!user) {
      throw new AppError('Only aunthenticated users can change avatar.', 401)
    }

    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar)
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath)

      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath)
      }
    }

    if (avatarFilename) {
      user.avatar = avatarFilename
    }

    await this.usersRepository.save(user)

    return user
  }
}

export default UpdateUserAvatarService
