import React, { useMemo } from 'react';
import { Stage, Component, RepresentationDescriptor } from 'react-ngl';
import { Stack } from '@chakra-ui/react';

type ViewerProps = {
  pdbId: string;
  reduced: boolean;
};

const makeRoute = (pdbId: string, reduced: boolean) => `rcsb://${pdbId}${reduced ? '.bb' : ''}.mmtf?ts=${Date.now()}`;

function loadingError(error: Error) {
  console.error(error);
}

function Viewer({ pdbId = '4hhb', reduced = false }: ViewerProps) {
  const reprList: RepresentationDescriptor[] = useMemo(
    () => [
      {
        type: 'cartoon',
      },
    ],
    [],
  );

  return (
    <Stack direction="column" borderRadius="lg" overflow="hidden">
      <Stage width="100%" height="50vh">
        <Component path={makeRoute(pdbId, reduced)} reprList={reprList} onLoadFailure={loadingError} />
      </Stage>
    </Stack>
  );
}

export default Viewer;
