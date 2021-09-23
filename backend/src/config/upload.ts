import multer, { StorageEngine } from 'multer'
import crypto from 'crypto'
import path from 'path'

interface IUploadConfig {
  driver: 's3' | 'disk'
  tempFolder: string
  uploadsFolder: string
  multer: {
    storage: StorageEngine
  }
  config: {
    disk: Record<string, never>
    aws: {
      bucket: string
    }
  }
}

const tempFolder = path.resolve(__dirname, '..', '..', './temp')

export default {
  driver: process.env.STORAGE_DRIVER,

  tempFolder,
  uploadsFolder: path.resolve(tempFolder, 'uploads'),
  multer: {
    storage: multer.diskStorage({
      destination: tempFolder,
      filename(request, file, callback) {
        const fileHash = crypto.randomBytes(10).toString('hex')
        const fileName = `${fileHash}-${file.originalname}`

        return callback(null, fileName)
      }
    })
  },

  config: {
    disk: {},
    aws: {
      bucket: 'langmerfisio'
    }
  }
} as IUploadConfig
