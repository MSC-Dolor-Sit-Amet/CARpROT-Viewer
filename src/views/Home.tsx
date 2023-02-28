import React from 'react';
import { Stack } from '@chakra-ui/react';
import Input from '../components/Input';
import Output from '../components/Output';
import translate from '../utils/translate';
import Viewer from '../components/Viewer';
import { directionsType, resultProteinsType, sequenceType } from '../types/InputOutputProps';

function Home() {
  const [sequence, setSequence] = React.useState<sequenceType>('');
  const handleSequenceChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => setSequence(e.target.value);

  const [directions, setDirections] = React.useState<directionsType>({ forward: true, reverse: true });

  const [resultProteins, setResultProteins] = React.useState<resultProteinsType>([]);

  const [pdbId, setPdbId] = React.useState<string | null>(null);

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
    <Stack direction="column" spacing={4} maxWidth="1000" margin="30px auto" borderRadius="lg">
      <Input {...inputProps} />
      <Output {...outputProps} />
      <Viewer pdbId={pdbId} />
    </Stack>
  );
}

export default Home;
