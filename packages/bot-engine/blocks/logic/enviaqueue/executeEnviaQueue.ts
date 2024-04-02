import { addEdgeToTypebot, createPortalEdge } from '../../../addEdgeToTypebot'
import { ExecuteLogicResponse } from '../../../types'
import { TRPCError } from '@trpc/server'
import { SessionState } from '@typebot.io/schemas'
import { EnviaQueueBlock } from '@typebot.io/schemas/features/blocks/logic/enviaqueue'

export const executeEnviaQueue = (
  state: SessionState,
  { queueId, blockId }: EnviaQueueBlock['options'] = {}
): ExecuteLogicResponse => {
  if (!queueId) return { outgoingEdgeId: undefined }
  const { typebot } = state.typebotsQueue[0]
  const groupToJumpTo = typebot.groups.find((group) => group.id === queueId)
  const blockToJumpTo =
    groupToJumpTo?.blocks.find((block) => block.id === blockId) ??
    groupToJumpTo?.blocks[0]

  if (!blockToJumpTo)
    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message: 'Block to jump to is not found',
    })

  return { outgoingEdgeId: '' }
}
