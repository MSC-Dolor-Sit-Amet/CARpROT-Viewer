import React from 'react';
import { Code, Heading, Stack } from '@chakra-ui/react';

function ResultSequence({ sequence, pdbId }) {
  return (
    <Stack direction="column" spacing={4} borderRadius="lg" minHeight="16rem" overflowX="auto">
      <Heading size="md">{pdbId ? `Protein ${pdbId}` : 'Sequence'}</Heading>
      <Code fontSize="1.4rem">{sequence}</Code>
    </Stack>
  );
}

export default ResultSequence;
