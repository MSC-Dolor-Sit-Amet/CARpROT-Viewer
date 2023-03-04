import React from 'react';
import { Checkbox, Stack, Text, Textarea, Divider } from '@chakra-ui/react';
import { InputProps } from '../types/InputOutputProps';

function Input({ sequence, handleSequenceChange, directions, setDirections }: InputProps) {
  return (
    <Stack direction="column" spacing={4} padding="5" borderRadius="lg">
      <Stack direction="column" spacing={2}>
        <Text as="b">Sequence</Text>
        <Textarea
          value={sequence}
          onChange={handleSequenceChange}
          placeholder="Enter sequence here..."
          size="lg"
          rows={8}
          spellCheck="false"
          resize="none"
        />
      </Stack>
      <Divider paddingY={3} />
      <Stack direction="column" spacing={2}>
        <Text as="b">DNA strands</Text>
        <Stack spacing={5} direction="row">
          <Checkbox
            value="forward"
            defaultChecked={directions.forward}
            onChange={e =>
              setDirections({
                ...directions,
                forward: e.target.checked,
              })
            }
          >
            Forward
          </Checkbox>
          <Checkbox
            value="reverse"
            defaultChecked={directions.reverse}
            onChange={e =>
              setDirections({
                ...directions,
                reverse: e.target.checked,
              })
            }
          >
            Reverse
          </Checkbox>
        </Stack>
      </Stack>
    </Stack>
  );
}

export default Input;
