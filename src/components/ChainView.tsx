import { buildInstanceFv } from '@rcsb/rcsb-saguaro-app';
import React, { useEffect } from 'react';
import { Stack } from '@chakra-ui/react';
import { useColorsContext } from '../providers/ColorsContext';
import { pdbIdType } from '../types/InputOutputProps';

function ChainView({ pdbId }: { pdbId: pdbIdType }) {
  const colors = useColorsContext();

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
      backgroundColor={colors.panelsColor}
      justifyContent="center"
      overflowX="auto"
    >
      {pdbId ? <div id="pfv" /> : null}
    </Stack>
  );
}

export default ChainView;
