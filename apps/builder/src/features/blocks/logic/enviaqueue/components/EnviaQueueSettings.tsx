import { Select } from '@/components/inputs/Select'
// import { useTypebot } from '@/features/editor/providers/TypebotProvider'
import { Stack } from '@chakra-ui/react'
import { EnviaQueueBlock } from '@typebot.io/schemas/features/blocks/logic/enviaqueue'
import React from 'react'
// import { byId, isNotEmpty } from '@typebot.io/lib'
// import { BlockIcon } from '@/features/editor/components/BlockIcon'

type Props = {
  options: EnviaQueueBlock['options']
  onOptionsChange: (options: EnviaQueueBlock['options']) => void
}

const items = ['Comercial', 'Financeiro']

export const EnviaQueueSettings = ({ options }: Props) => {
  return (
    <Stack spacing={4}>
      {/* <Select
        items={typebot.groups
          .filter(
            (group) => group.id !== currentGroupId && isNotEmpty(group.title)
          )
          .map((group) => ({
            label: group.title,
            value: group.id,
          }))}
        selectedItem={selectedGroup?.id}
        onSelect={handleGroupIdChange}
        placeholder="Selecione uma fila..."
      /> */}
      <Select
        selectedItem={options?.blockId}
        items={items}
        placeholder="Selecione uma fila..."
      />
    </Stack>
  )
}
