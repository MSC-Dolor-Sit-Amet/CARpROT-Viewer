import React from 'react';
import { Checkbox, Stack, Text, Textarea, Button } from '@chakra-ui/react';

function Start() {
  const [value, setValue] = React.useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const inputValue = e.target.value;
    setValue(inputValue);
  };
  return (
    <Stack direction="column" spacing={4} align="left" padding="5">
      <Stack direction="row" spacing={2}>
        <Text mb="8px">Sequence:</Text>
        <Textarea value={value} onChange={handleInputChange} placeholder="Enter sequence here..." size="lg" />
      </Stack>
      <Stack spacing={5} direction="row">
        <Checkbox value="forward" defaultChecked>
          Forward
        </Checkbox>
        <Checkbox value="reverse" defaultChecked>
          Reverse
        </Checkbox>
      </Stack>
      <Button width="min-content">Translate</Button>
    </Stack>
  );
}

export default Start;
