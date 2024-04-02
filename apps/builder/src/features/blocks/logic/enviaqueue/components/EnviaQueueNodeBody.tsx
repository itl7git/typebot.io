import React from 'react'
import { Text } from '@chakra-ui/react'
// import { useTypebot } from '@/features/editor/providers/TypebotProvider'
import { EnviaQueueBlock } from '@typebot.io/schemas/features/blocks/logic/enviaqueue'

type Props = {
  options: EnviaQueueBlock['options']
}

export const EnviaQueueNodeBody = ({ options }: Props) => {
  return <Text>Tranferir para Fila {options?.queueId}</Text>
}
