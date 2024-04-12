import prisma from '@typebot.io/lib/prisma'
import { authenticatedProcedure } from '@/helpers/server/trpc'
import { TRPCError } from '@trpc/server'
import { z } from 'zod'
import { isReadWorkspaceFobidden } from '@/features/workspace/helpers/isReadWorkspaceFobidden'
//import { decrypt } from '@typebot.io/lib/api/encryption/decrypt'
//import { ZemanticAiCredentials } from '@typebot.io/schemas/features/blocks/integrations/zemanticAi'
import got from 'got'

type QueuesResponse = {
  queues: {
    name: string
    id: number
  }[]
}

export const listQueues = authenticatedProcedure
  .input(
    z.object({
      workspaceId: z.string(),
    })
  )
  .query(async ({ input: { workspaceId }, ctx: { user } }) => {
    const workspace = await prisma.workspace.findFirst({
      where: { id: workspaceId },
      select: {
        members: {
          select: {
            userId: true,
          },
        },
      },
    })

    if (!workspace || isReadWorkspaceFobidden(workspace, user))
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'No workspace found',
      })

    // const credentials = workspace.credentials.at(0)

    // if (!credentials)
    //   throw new TRPCError({
    //     code: 'NOT_FOUND',
    //     message: 'No credentials found',
    //   })

    // const data = (await decrypt(
    //   credentials.data,
    //   credentials.iv
    // )) as ZemanticAiCredentials['data']

    const url = `https://api.dev.enviawhats.com/typebot/getqueues/${user?.email}`

    try {
      const response = await got
        .get(url, {
          headers: {
            token: 'deddb52e95c2eb7d20b0a3959e20f5d9',
          },
        })
        .json<QueuesResponse>()

      const convertedResponse = response.queues.map((item) => ({
        id: item.id.toString(),
        name: item.name,
      }))

      return convertedResponse.map((queue) => ({
        value: queue.id,
        label: queue.name,
      }))
    } catch (e) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Could not list queues',
        cause: e,
      })
    }
  })
