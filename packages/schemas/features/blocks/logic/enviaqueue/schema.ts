import { z } from '../../../../zod'
import { blockBaseSchema } from '../../shared'
import { LogicBlockType } from '../constants'

export const enviaQueueOptionsSchema = z.object({
  queueId: z.string().optional(),
  blockId: z.string().optional(),
})

export const enviaQueueBlockSchema = blockBaseSchema.merge(
  z.object({
    type: z.enum([LogicBlockType.ENVIA_QUEUE]),
    options: enviaQueueOptionsSchema.optional(),
  })
)

export type EnviaQueueBlock = z.infer<typeof enviaQueueBlockSchema>
