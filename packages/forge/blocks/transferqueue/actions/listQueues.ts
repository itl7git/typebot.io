import { createAction, option } from '@typebot.io/forge'
//import { useSession } from 'next-auth/react'
//import { getSession } from 'next-auth/react'
//import { useUser } from '../../../../../apps/builder/src/features/account/hooks/useUser'
import { auth } from '../auth'
import { baseUrl } from '../constants'
import { QueuesResponse } from '../type'
import got from 'got'

//const { user } = useUser()

export const listQueues = createAction({
  name: 'Departamentos',
  auth,
  options: option.object({
    queueId: option.string.layout({
      fetcher: 'fetchQueues',
      label: 'Filas',
      placeholder: 'Selecione uma fila',
    }),
  }),
  fetchers: [
    {
      id: 'fetchQueues',
      fetch: async ({ credentials }) => {
        const response = await got
          .get(baseUrl + `/typebot/getqueues/itlcoorporativo@gmail.com`, {
            headers: {
              token: credentials.apiKey,
            },
          })
          .json<QueuesResponse>()

        const convertedResponse = response.queues.map((item) => ({
          id: item.id.toString(),
          name: item.name,
        }))

        //console.log('converteResponse', convertedResponse)

        return convertedResponse.map((queue) => ({
          value: queue.id,
          label: queue.name,
        }))
      },
      dependencies: [],
    },
  ],
})
