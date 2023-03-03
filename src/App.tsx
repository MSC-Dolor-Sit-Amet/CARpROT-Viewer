import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useDisclosure } from '@chakra-ui/react';
import Header from './components/Header';
import Home from './views/Home';
import { sequenceType, directionsType, resultProteinsType, pdbIdType } from './types/InputOutputProps';
import translate from './utils/translate';

function App() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

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

  const drawerProps = {
    isOpen,
    onOpen,
    onClose,
    btnRef,
  };

  return (
    <>
      <Header btnRef={btnRef} onOpen={onOpen} resultProteins={resultProteins} setPdbId={setPdbId} />
      <Routes>
        <Route path="/" element={<Home inputProps={inputProps} outputProps={outputProps} drawerProps={drawerProps} pdbId={pdbId} />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;
