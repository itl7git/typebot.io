export type QueuesResponse = {
  queues: {
    name: string
    id: number
  }[]
}

export type ConvertedQueuesResponse = {
  Convertedqueues: {
    name: string
    id: string
  }[]
}
