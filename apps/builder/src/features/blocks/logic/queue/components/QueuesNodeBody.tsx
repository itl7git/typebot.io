// import { SetVariableLabel } from '@/components/SetVariableLabel'
// import { useTypebot } from '@/features/editor/providers/TypebotProvider'
import { Stack, Text } from '@chakra-ui/react'
import { QueuesBlock } from '@typebot.io/schemas/features/blocks/logic/queue'

type Props = {
  options: QueuesBlock['options']
}

export const QueuesNodeBody = ({ options }: Props) => {
  //const { typebot } = useTypebot()

  return (
    <Stack>
      <Text
        color={(options?.queueId as string) ? 'currentcolor' : 'gray.500'}
        noOfLines={1}
      >
        {options?.queueId ?? 'Configure...'}
      </Text>
    </Stack>
  )
}
