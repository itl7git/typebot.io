import { TextInput } from "@/components/inputs"
import { Button, Stack } from "@chakra-ui/react"
import { useState } from "react";
// import { RdStationOptions } from "@typebot.io/schemas"

// type Props = {
//   options: RdStationOptions
//   onOptionsChange: (options: RdStationOptions) => void
// }

export const RdSettings = () => {
  const [tokenId, setTokenId] = useState('')
  const [name, setName] = useState('')

  // const updateTokenId = (tokenId?: string) => 
  // onOptionsChange({
  //   ...options,
  //   tokenId,
  // })

  // const updateName = (name?: string) => 
  // onOptionsChange({
  //   ...options,
  //   name,
  // })

  async function handleCreateDeal() {
    console.log(tokenId, name)
    
    fetch('http://localhost:3000/api/integrations/rd-station/createDeal', {
      method: 'POST',
      headers: {accept: 'application/json', 'content-type': 'application/json'},
      body: JSON.stringify({
        tokenId,
        name
      })
    })
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));
    
  }

  return (
    <Stack spacing={4}>
      <form onSubmit={handleCreateDeal}>
        <Stack spacing={4} style={{marginBottom: 10}}>
          <TextInput
            label="Token:"
            defaultValue={tokenId}
            onChange={setTokenId}
            moreInfoTooltip="Faça Login no RDStation CRM -> Perfil -> Token"
            isRequired
            placeholder="Adicione o token"
          />
          <TextInput
            placeholder="Nome da oportunidade"
            defaultValue={name}
            onChange={setName}
          />
        </Stack>

        <Button
          colorScheme="blue"
          type="submit"
          style={{width: '100%'}}
        >
          Criar
        </Button>
    </form>
    </Stack>
  )
}