import { router } from '@/helpers/server/trpc'
import { listQueues } from './listQueues'

export const queuesRouter = router({
  listQueues,
})
