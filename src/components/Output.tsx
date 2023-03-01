import React from 'react';
import { Divider, Select, Stack, Text } from '@chakra-ui/react';
import { OutputProps } from '../types/InputOutputProps';
import { useColorsContext } from '../providers/ColorsContext';

function Output({ resultProteins, setPdbId }: OutputProps) {
  const colors = useColorsContext();

  return (
    <Stack direction="column" spacing={4} padding="5" borderRadius="lg" backgroundColor={colors.panelsColor}>
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
