import React from 'react';
import { Stack, useDisclosure } from '@chakra-ui/react';
import Input from '../components/Input';
import Output from '../components/Output';
import translate from '../utils/translate';
import Viewer from '../components/Viewer';
import { directionsType, pdbIdType, resultProteinsType, sequenceType } from '../types/InputOutputProps';
import ChainView from '../components/ChainView';
import DrawerComponent from '../components/Drawer';

function Home({ drawerProps }) {
  const [sequence, setSequence] = React.useState<sequenceType>('');
  const handleSequenceChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => setSequence(e.target.value);

  const [directions, setDirections] = React.useState<directionsType>({ forward: true, reverse: true });

  const [resultProteins, setResultProteins] = React.useState<resultProteinsType>([]);

  const [pdbId, setPdbId] = React.useState<pdbIdType>(null);

  const handleTranslate = () => {
    const proteins = translate(sequence, directions);

    // update values when fetching ends
    Promise.all(proteins).then(res => {
      setResultProteins(
        res.filter(n => n), // filter out empty elements
      );
    });
  };

  const inputProps = {
    sequence,
    handleSequenceChange,
    directions,
    setDirections,
    handleTranslate,
  };

  const outputProps = {
    resultProteins,
    setPdbId,
  };

  return (
    <>
      <DrawerComponent drawerProps={drawerProps} inputProps={inputProps} />
      <Stack direction="column" spacing={4} maxWidth="1000" paddingX={5} marginX="auto" marginY={5} borderRadius="lg">
        <Output {...outputProps} />
        <ChainView pdbId={pdbId} />
        <Viewer pdbId={pdbId} />
      </Stack>
    </>
  );
}

export default Home;
