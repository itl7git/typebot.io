import { SessionState } from '@typebot.io/schemas'
import { QueuesBlock } from '@typebot.io/schemas/features/blocks/logic/queue'
//import { createChatCompletionOpenAI } from './createChatCompletionOpenAI'
import { ExecuteLogicResponse } from '../../../types'
//import { createSpeechOpenAI } from './audio/createSpeechOpenAI'
import got from 'got'

const URL = 'https://66197af4125e9bb9f29a18f7.mockapi.io/queues'

export const executeQueueBlock = async (
  state: SessionState,
  block: QueuesBlock
): Promise<ExecuteLogicResponse> => {
  let newSessionState = state

  try {
    await got
      .post(URL, {
        json: {
          queueId: block.options?.queueId,
          companyId: '2',
        },
      })
      .json()
  } catch (e) {
    console.error(e)
  }

  return {
    outgoingEdgeId: block.outgoingEdgeId,
    //newSessionState,
  }
}
