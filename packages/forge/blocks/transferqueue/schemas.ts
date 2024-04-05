// Do not edit this file manually
import { parseBlockCredentials, parseBlockSchema } from '@typebot.io/forge'
import { transferqueueBlock } from '.'

export const transferqueueBlockSchema = parseBlockSchema(transferqueueBlock)
export const transferqueueCredentialsSchema =
  parseBlockCredentials(transferqueueBlock)
