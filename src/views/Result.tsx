import { Stack } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ChainView from '../components/ChainView';
import Viewer from '../components/Viewer';
import ResultSequence from '../components/ResultSequence';
import PropertiesTable from '../components/PropertiesTable';
import ImageViewer from '../components/ImageViewer';

function Result() {
  const [searchParams] = useSearchParams();

  const [sequence, setSequence] = React.useState('');
  const [pdbId, setPdbId] = React.useState('');

  useEffect(() => {
    setSequence(searchParams.get('sequence') || '');
    setPdbId(searchParams.get('pdbid') || '');
  }, [searchParams]);

  return (
    <Stack direction="column" flexGrow={1} spacing={4} width="100%" maxWidth="1100" marginX="auto" padding={5} borderRadius="lg" overflow="hidden">
      <Stack
        direction="column"
        flexGrow={1}
        spacing={4}
        borderRadius="lg"
        padding={5}
        border="solid 1px"
        borderColor="var(--chakra-colors-chakra-border-color)"
        overflow="hidden"
      >
        <ResultSequence sequence={sequence} pdbId={pdbId} />
        <PropertiesTable sequence={sequence} />
        <ChainView pdbId={pdbId} />
        <ImageViewer sequence={sequence} />
        <Viewer pdbId={pdbId} />
      </Stack>
    </Stack>
  );
}

export default Result;
