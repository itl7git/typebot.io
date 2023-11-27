import { z } from 'zod'
import { blockBaseSchema } from '../baseSchemas'
import { IntegrationBlockType } from './enums'

export const rdStationOptionsSchema = z.object({
  tokenId: z.string().optional(),
  name: z.string().optional(),
})

export const rdStationBlockSchema = blockBaseSchema.merge(
  z.object({
    type: z.enum([IntegrationBlockType.RD]),
    options: rdStationOptionsSchema,
  })
)

export const defaultRdStationOptions: RdStationOptions = {}

export type RdStationBlock = z.infer<typeof rdStationBlockSchema>
export type RdStationOptions = z.infer<
  typeof rdStationOptionsSchema
>
