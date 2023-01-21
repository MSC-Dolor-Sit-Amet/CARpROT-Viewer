import React from "react";
import { Checkbox, Stack, Text, Textarea } from '@chakra-ui/react'
import { Button } from '@chakra-ui/react'

function Start() {
  let [value, setValue] = React.useState('')

  let handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    let inputValue = e.target.value
    setValue(inputValue)
  }
  return (
    <Stack direction='column' spacing={4} align='left'>
      <Stack direction='row' spacing={2}>
        <Text mb='8px'>Sequence:</Text>
        <Textarea
          value={value}
          onChange={handleInputChange}
          placeholder='Here is a sample placeholder'
          size='lg'
        />
      </Stack>
      <Stack spacing={5} direction='row'>
        <Checkbox value="forward" defaultChecked>
          Forward
        </Checkbox>
        <Checkbox value="reverse" defaultChecked>
          Reverse
        </Checkbox>
      </Stack>
      <Button colorScheme='blue' width='min-content'>Translate</Button>
    </Stack>
  )
}

export default Start;
