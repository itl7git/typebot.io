import { z } from '../../../../zod'
import {
  chatCompletionMessageRoles,
  chatCompletionResponseValues,
  QueuesTasks,
  QueuesVoices,
} from './constants'
import { variableStringSchema } from '../../../utils'
import { blockBaseSchema, credentialsBaseSchema } from '../../shared'
import { LogicBlockType } from '../constants'

const QueuesBaseOptionsSchema = z.object({
  credentialsId: z.string().optional(),
  queueId: z.string().optional(),
})

export const queuesBlockSchema = blockBaseSchema.merge(
  z.object({
    type: z.enum([LogicBlockType.QUEUE]),
    blockId: z.string().optional(),
    options: QueuesBaseOptionsSchema.optional(),
  })
)
export type QueuesBlock = z.infer<typeof queuesBlockSchema>
