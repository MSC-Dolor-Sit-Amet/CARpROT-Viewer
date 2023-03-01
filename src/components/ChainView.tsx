import { buildInstanceFv } from '@rcsb/rcsb-saguaro-app';
import React, { useEffect } from 'react';
import { Stack, useColorMode } from '@chakra-ui/react';

function ChainView({ pdbId }: { pdbId: string }) {
  const { colorMode } = useColorMode();

  useEffect(() => {
    if (!pdbId) return;
    buildInstanceFv('pfv', `${pdbId}.A`, {
      boardConfig: {},
    });
  }, [pdbId]);

  return (
    <Stack
      direction="column"
      spacing={4}
      padding="5"
      borderRadius="lg"
      minHeight="16rem"
      backgroundColor={colorMode === 'light' ? 'blue.50' : 'whiteAlpha.100'}
    >
      {pdbId ? <div id="pfv" style={{ maxWidth: '10vw' }} /> : null}
    </Stack>
  );
}

export default ChainView;
