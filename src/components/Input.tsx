import React from 'react';
import { Checkbox, Stack, Text, Textarea, Button, RadioGroup, Radio, Divider, useColorMode } from '@chakra-ui/react';
import InputOutputProps from '../types/InputOutputProps';

function Input({ sequence, handleSequenceChange, directions, setDirections, method, setMethod, handleTranslate }: InputOutputProps) {
  const { colorMode } = useColorMode();

  return (
    <Stack direction="column" spacing={4} padding="5" borderRadius="lg" backgroundColor={colorMode === 'light' ? 'blue.50' : 'whiteAlpha.100'}>
      <Text fontSize="xl" as="b">
        Input
      </Text>
      <Divider />
      <Stack direction="column" spacing={2}>
        <Text as="b">Sequence:</Text>
        <Textarea value={sequence} onChange={handleSequenceChange} placeholder="Enter sequence here..." size="lg" rows={8} spellCheck="false" />
      </Stack>
      <Stack direction="column" spacing={2}>
        <Text as="b">DNA strands:</Text>
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

      <Stack direction="column" spacing={2}>
        <Text as="b">Output format:</Text>
        <RadioGroup value={method} onChange={setMethod}>
          <Stack spacing="1" direction="column">
            <Radio value="1">Verbose: Met, Stop, spaces between residues</Radio>
            <Radio value="2">Compact: M, -, no spaces</Radio>
            <Radio value="3">Includes nucleotide sequence</Radio>
            <Radio value="4">Includes nucleotide sequence, no spaces</Radio>
          </Stack>
        </RadioGroup>
      </Stack>
      <Button width="min-content" onClick={handleTranslate}>
        Translate
      </Button>
    </Stack>
  );
}

export default Input;
