import multer from 'multer'
import crypto from 'crypto'
import path from 'path'

const tempFolder = path.resolve(__dirname, '..', '..', './temp')

export default {
  tempFolder,
  uploadsFolder: path.resolve(tempFolder, 'uploads'),

  storage: multer.diskStorage({
    destination: tempFolder,
    filename(request, file, callback) {
      const fileHash = crypto.randomBytes(10).toString('hex')
      const fileName = `${fileHash}-${file.originalname}`

      return callback(null, fileName)
    }
  })
}
