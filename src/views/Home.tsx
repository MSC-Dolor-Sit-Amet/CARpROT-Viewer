import React from 'react';
import { Stack } from '@chakra-ui/react';
import Input from '../components/Input';
import Output from '../components/Output';
import translate from '../utils/translate';
import Viewer from '../components/Viewer';

function Home() {
  const [sequence, setSequence] = React.useState('');
  const handleSequenceChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => setSequence(e.target.value);

  const [directions, setDirections] = React.useState({ forward: true, reverse: true });

  const [resultSequences, setResultSequences] = React.useState<string[]>([]);

  const handleTranslate = () => {
    const proteins = translate(sequence, directions);

    // update values when fetching ends
    Promise.all(proteins).then(res => {
      setResultSequences(
        res.filter(n => n), // filter out empty elements
      );
    });
  };

  const props = {
    sequence,
    setSequence,
    directions,
    setDirections,
    resultSequences,
    setResultSequences,
    handleSequenceChange,
    handleTranslate,
  };

  return (
    <Stack direction="column" spacing={4} maxWidth="1000" margin="30px auto" borderRadius="lg">
      <Input {...props} />
      <Output {...props} />
      <Viewer {...props} />
    </Stack>
  );
}

export default Home;
