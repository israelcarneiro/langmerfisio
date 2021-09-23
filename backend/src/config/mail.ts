interface IMailConfig {
  driver: 'ethereal' | 'ses'
  defaults: {
    from: {
      email: string
      name: string
    }
  }
}

export default {
  driver: process.env.MAIL_DRIVER || 'ethereal',
  defaults: {
    from: {
      email: 'israel@langmerfisio.com.br',
      name: 'Israel da Langmer Fisio'
    }
  }
} as IMailConfig
