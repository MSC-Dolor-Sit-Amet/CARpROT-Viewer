import React, { useMemo } from 'react';
import { Stage, Component, RepresentationDescriptor } from 'react-ngl';
import { Stack } from '@chakra-ui/react';

type ViewerProps = {
  pdbId: string | null;
};

const makeRoute = (pdbId: string, reduced: boolean) => `rcsb://${pdbId}${reduced ? '.bb' : ''}.mmtf?ts=${Date.now()}`;

function loadingError(error: Error) {
  console.error(error);
}

function Viewer({ pdbId }: ViewerProps) {
  const reduced = false;
  const reprList: RepresentationDescriptor[] = useMemo(
    () => [
      {
        type: 'cartoon',
      },
    ],
    [],
  );

  return (
    <Stack direction="column" borderRadius="lg" overflow="hidden" height="50vh" bgColor="#000000">
      {pdbId ? (
        <Stage width="100%" height="100%">
          <Component path={makeRoute(pdbId, reduced)} reprList={reprList} onLoadFailure={loadingError} />
        </Stage>
      ) : null}
    </Stack>
  );
}

export default Viewer;
