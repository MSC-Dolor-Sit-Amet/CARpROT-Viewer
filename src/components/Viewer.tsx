import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Stage, Component, RepresentationDescriptor, Position, Rotation, applyCameraState } from 'react-ngl';
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

  const [hasLoaded, setHasLoaded] = useState(false);

  const [cameraState, setCameraState] = useState({});

  const onLoaded = () => {
    if (!hasLoaded) {
      setHasLoaded(true);
      setCameraState({});
    }
  };

  return (
    <Stack direction="column" borderRadius="lg" overflow="hidden" height="50vh" bgColor="#000000">
      {pdbId ? (
        <Stage width="100%" height="100%" cameraState={cameraState}>
          <Component path={makeRoute(pdbId, reduced)} reprList={reprList} onLoad={onLoaded} onLoadFailure={loadingError} />
        </Stage>
      ) : null}
    </Stack>
  );
}

export default Viewer;
