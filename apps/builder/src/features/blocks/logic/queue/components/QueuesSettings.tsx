import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Stack,
  useDisclosure,
  Text,
} from '@chakra-ui/react'
import React from 'react'
import { CredentialsDropdown } from '@/features/credentials/components/CredentialsDropdown'
import {
  ChatCompletionOpenAIOptions,
  CreateImageOpenAIOptions,
  CreateSpeechOpenAIOptions,
  QueuesBlock,
} from '@typebot.io/schemas/features/blocks/logic/queue'
import { QueuesCredentialsModal } from './QueuesCredentialsModal'
import { useWorkspace } from '@/features/workspace/WorkspaceProvider'
import { DropdownList } from '@/components/DropdownList'
import { QueuesCompletionSettings } from './createChatCompletion/QueuesCompletionSettings'
import { TextInput } from '@/components/inputs'
import {
  defaultQueuesOptions,
  QueuesTasks,
} from '@typebot.io/schemas/features/blocks/logic/queue/constants'
import { QueuesCreateSpeechSettings } from './audio/QueuesCreateSpeechSettings'

type OpenAITask = (typeof QueuesTasks)[number]

type Props = {
  block: QueuesBlock
  onOptionsChange: (options: QueuesBlock['options']) => void
}

export const QueuesSettings = ({
  block: { options },
  onOptionsChange,
}: Props) => {
  const { workspace } = useWorkspace()
  const { isOpen, onOpen, onClose } = useDisclosure()

  const updateCredentialsId = (credentialsId: string | undefined) => {
    onOptionsChange({
      ...options,
      credentialsId,
    })
  }

  const updateTask = (task: OpenAITask) => {
    onOptionsChange({
      credentialsId: options?.credentialsId,
      task,
    } as QueuesBlock['options'])
  }

  const updateBaseUrl = (baseUrl: string) => {
    onOptionsChange({
      ...options,
      baseUrl,
    })
  }

  const updateApiVersion = (apiVersion: string) => {
    onOptionsChange({
      ...options,
      apiVersion,
    })
  }

  const baseUrl = options?.baseUrl ?? defaultQueuesOptions.baseUrl

  return (
    <Stack>
      {workspace && (
        <>
          <CredentialsDropdown
            type="openai"
            workspaceId={workspace.id}
            currentCredentialsId={options?.credentialsId}
            onCredentialsSelect={updateCredentialsId}
            onCreateNewClick={onOpen}
            credentialsName="OpenAI account"
          />
          <QueuesCredentialsModal
            isOpen={isOpen}
            onClose={onClose}
            onNewCredentials={updateCredentialsId}
          />
        </>
      )}
      {options?.credentialsId && (
        <>
          <Accordion allowToggle>
            <AccordionItem>
              <AccordionButton>
                <Text w="full" textAlign="left">
                  Customize provider
                </Text>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel as={Stack} spacing={4}>
                <TextInput
                  label="Base URL"
                  defaultValue={baseUrl}
                  onChange={updateBaseUrl}
                />
                {baseUrl !== defaultQueuesOptions.baseUrl && (
                  <TextInput
                    label="API version"
                    defaultValue={options.apiVersion}
                    onChange={updateApiVersion}
                  />
                )}
              </AccordionPanel>
            </AccordionItem>
          </Accordion>

          <DropdownList
            currentItem={options.task}
            items={QueuesTasks.slice(0, -1)}
            onItemSelect={updateTask}
            placeholder="Select task"
          />
          {options.task && (
            <OpenAITaskSettings
              options={options}
              onOptionsChange={onOptionsChange}
            />
          )}
        </>
      )}
    </Stack>
  )
}

const OpenAITaskSettings = ({
  options,
  onOptionsChange,
}: {
  options:
    | ChatCompletionOpenAIOptions
    | CreateImageOpenAIOptions
    | CreateSpeechOpenAIOptions
  onOptionsChange: (options: QueuesBlock['options']) => void
}): JSX.Element | null => {
  switch (options.task) {
    case 'Create chat completion': {
      return (
        <QueuesCompletionSettings
          options={options}
          onOptionsChange={onOptionsChange}
        />
      )
    }
    case 'Create speech': {
      return (
        <QueuesCreateSpeechSettings
          options={options}
          onOptionsChange={onOptionsChange}
        />
      )
    }
    case 'Create image': {
      return null
    }
  }
}
