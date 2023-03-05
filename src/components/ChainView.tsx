import { buildInstanceFv } from '@rcsb/rcsb-saguaro-app';
import React, { useEffect } from 'react';
import { Stack } from '@chakra-ui/react';
import { PdbIdType } from '../types/InputOutputProps';

function ChainView({ pdbId }: { pdbId: PdbIdType }) {
  useEffect(() => {
    if (!pdbId) return;
    buildInstanceFv('pfv', `${pdbId}.A`, {
      boardConfig: {},
    });
  }, [pdbId]);

  return pdbId ? (
    <Stack direction="column" spacing={4} padding="5" borderRadius="lg" minHeight="24rem" justifyContent="center" overflowX="auto">
      <div id="pfv" />
    </Stack>
  ) : null;
}

export default ChainView;
