import React from 'react';
import { Divider, Select, Stack, Text, useColorMode } from '@chakra-ui/react';
import { OutputProps } from '../types/InputOutputProps';

function Output({ resultProteins, setPdbId }: OutputProps) {
  const { colorMode } = useColorMode();

  return (
    <Stack direction="column" spacing={4} padding="5" borderRadius="lg" backgroundColor={colorMode === 'light' ? 'blue.50' : 'whiteAlpha.100'}>
      <Text fontSize="xl" as="b">
        Output
      </Text>
      <Divider />
      <Select
        placeholder="Select protein"
        onChange={e => {
          const val = e.target.value;
          if (val === '') return;
          setPdbId(resultProteins[Number(val)]);
        }}
      >
        {resultProteins.map((resultSequence, index) => (
          <option key={resultSequence} value={index}>
            {resultSequence}
          </option>
        ))}
      </Select>
    </Stack>
  );
}

export default Output;
