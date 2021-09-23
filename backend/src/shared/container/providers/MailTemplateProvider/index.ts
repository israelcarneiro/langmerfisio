import { container } from 'tsyringe'

import IMailTemplateProvider from '../MailTemplateProvider/models/IMailTemplateProvider'
import HandlebarsMailTemplateProvider from '../MailTemplateProvider/implementations/HandlebarsMailTemplateProvider'

const providers = {
  handlebars: HandlebarsMailTemplateProvider
}

container.registerSingleton<IMailTemplateProvider>(
  'MailTemplateProvider',
  providers.handlebars
)
