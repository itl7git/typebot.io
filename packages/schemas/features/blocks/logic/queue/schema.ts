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
  baseUrl: z.string().optional(),
  apiVersion: z.string().optional(),
})

const initialOptionsSchema = z
  .object({
    task: z.undefined().openapi({
      type: 'string',
    }),
  })
  .merge(QueuesBaseOptionsSchema)

export const nativeMessageSchema = z.object({
  id: z.string(),
  role: z.enum(chatCompletionMessageRoles).optional(),
  content: z.string().optional(),
  name: z.string().optional(),
})

const messageSequenceItemSchema = z.object({
  id: z.string(),
  role: z.literal('Messages sequence ✨'),
  content: z
    .object({
      assistantMessagesVariableId: z.string().optional(),
      userMessagesVariableId: z.string().optional(),
    })
    .optional(),
})

const dialogueItemSchema = z.object({
  id: z.string(),
  role: z.literal('Dialogue'),
  dialogueVariableId: z.string().optional(),
  startsBy: z.enum(['user', 'assistant']).optional(),
})

const chatCompletionOptionsSchema = z
  .object({
    task: z.literal(QueuesTasks[0]),
    model: z.string().optional(),
    messages: z
      .array(
        z.union([
          nativeMessageSchema,
          messageSequenceItemSchema,
          dialogueItemSchema,
        ])
      )
      .optional(),
    advancedSettings: z
      .object({
        temperature: z.number().or(variableStringSchema).optional(),
      })
      .optional(),
    responseMapping: z
      .array(
        z.object({
          id: z.string(),
          valueToExtract: z.preprocess(
            (val) => (!val ? 'Message content' : val),
            z.enum(chatCompletionResponseValues)
          ),
          variableId: z.string().optional(),
        })
      )
      .optional(),
  })
  .merge(QueuesBaseOptionsSchema)
export type ChatCompletionOpenAIOptions = z.infer<
  typeof chatCompletionOptionsSchema
>

const createImageOptionsSchema = z
  .object({
    task: z.literal(QueuesTasks[2]),
    prompt: z.string().optional(),
    advancedOptions: z.object({
      size: z.enum(['256x256', '512x512', '1024x1024']).optional(),
    }),
    responseMapping: z.array(
      z.object({
        id: z.string(),
        valueToExtract: z.enum(['Image URL']),
        variableId: z.string().optional(),
      })
    ),
  })
  .merge(QueuesBaseOptionsSchema)
export type CreateImageOpenAIOptions = z.infer<typeof createImageOptionsSchema>

const createSpeechOptionsSchema = QueuesBaseOptionsSchema.extend({
  task: z.literal(QueuesTasks[1]),
  model: z.string().optional(),
  input: z.string().optional(),
  voice: z.enum(QueuesVoices).optional(),
  saveUrlInVariableId: z.string().optional(),
})
export type CreateSpeechOpenAIOptions = z.infer<
  typeof createSpeechOptionsSchema
>

export const queuesBlockSchema = blockBaseSchema.merge(
  z.object({
    type: z.enum([LogicBlockType.QUEUE]),
    options: z
      .discriminatedUnion('task', [
        initialOptionsSchema,
        chatCompletionOptionsSchema,
        createImageOptionsSchema,
        createSpeechOptionsSchema,
      ])
      .optional(),
  })
)
export type QueuesBlock = z.infer<typeof queuesBlockSchema>

export const QueuesCredentialsSchema = z
  .object({
    type: z.literal('openai'),
    data: z.object({
      apiKey: z.string(),
    }),
  })
  .merge(credentialsBaseSchema)
export type QueuesCredentials = z.infer<typeof QueuesCredentialsSchema>
