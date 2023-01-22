import React from 'react';
import { Code, Divider, Stack, Text } from '@chakra-ui/react';
import InputOutputProps from '../types/InputOutputProps';

function Output({ resultSequences }: InputOutputProps) {
  return (
    <Stack direction="column" spacing={4} padding="5" borderRadius="lg" backgroundColor="whiteAlpha.100">
      <Text fontSize="xl" as="b">
        Output
      </Text>
      {resultSequences.map((resultSequence, index) => (
        <Stack key={resultSequence}>
          <Divider />
          <Text fontSize="lg" as="b">
            Frame {index + 1}
          </Text>
          <Code wordBreak="break-all">
            <Text>{resultSequence}</Text>
          </Code>
        </Stack>
      ))}
    </Stack>
  );
}

export default Output;
