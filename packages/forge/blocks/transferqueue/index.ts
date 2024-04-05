import { createBlock } from '@typebot.io/forge'
import { TransferqueueLogo } from './logo'
import { auth } from './auth'
import { listQueues } from './actions/listQueues'

export const transferqueueBlock = createBlock({
  id: 'transferqueue',
  name: 'Tranferir Fila',
  tags: [],
  LightLogo: TransferqueueLogo,
  auth,
  actions: [listQueues],
})
