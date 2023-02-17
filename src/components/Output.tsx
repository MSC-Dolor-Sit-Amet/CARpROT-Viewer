import React from 'react';
import { Code, Divider, Stack, Text, useColorMode } from '@chakra-ui/react';
import InputOutputProps from '../types/InputOutputProps';

function Output({ resultSequences }: InputOutputProps) {
  const { colorMode } = useColorMode();

  return (
    <Stack direction="column" spacing={4} padding="5" borderRadius="lg" backgroundColor={colorMode === 'light' ? 'blue.50' : 'whiteAlpha.100'}>
      <Text fontSize="xl" as="b">
        Output
      </Text>
      {resultSequences.map((resultSequence, index) => (
        <Stack key={index}>
          <Divider />
          <Text fontSize="lg" as="b">
            Protein {index + 1}
          </Text>
          <Code wordBreak="break-all" fontSize="1.1em" borderRadius="md">
            <Text fontFamily="Red Hat Mono">{resultSequence}</Text>
          </Code>
        </Stack>
      ))}
    </Stack>
  );
}

export default Output;
