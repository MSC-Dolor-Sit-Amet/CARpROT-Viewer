import React from 'react';
import { Code, Heading, Stack } from '@chakra-ui/react';

function ResultSequence({ sequence, pdbId }) {
  return (
    <Stack direction="column" spacing={4} marginBottom={10} overflowX="auto">
      <Heading size="lg">{pdbId ? `Protein ${pdbId}` : 'Sequence'}</Heading>
      <Code fontSize="1.2rem">{sequence}</Code>
    </Stack>
  );
}

export default ResultSequence;
