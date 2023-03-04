import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useDisclosure } from '@chakra-ui/react';
import Header from './components/Header';
import Home from './views/Home';
import { sequenceType, directionsType, resultProteinType } from './types/InputOutputProps';
import translate from './utils/translate';
import Result from './views/Result';

function App() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  const [sequence, setSequence] = React.useState<sequenceType>('');
  const handleSequenceChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => setSequence(e.target.value);

  const [directions, setDirections] = React.useState<directionsType>({ forward: true, reverse: true });

  const [resultProteins, setResultProteins] = React.useState<resultProteinType[]>([]);

  const handleTranslate = () => {
    const [sequences, proteins, images] = translate(sequence, directions);

    Promise.all(proteins).then(p => {
      const peptides: resultProteinType[] = [];

      // create array of sequence -> protein name
      sequences.forEach((element, i) => {
        peptides.push({ index: i, sequence: element, pdbId: p[i], imageSrc: images[i] });
      });

      setResultProteins(peptides);
    });
  };

  const inputProps = {
    sequence,
    handleSequenceChange,
    directions,
    setDirections,
    handleTranslate,
  };

  const drawerProps = {
    isOpen,
    onOpen,
    onClose,
    btnRef,
  };

  return (
    <>
      <Header btnRef={btnRef} onOpen={onOpen} />
      <Routes>
        <Route path="/" element={<Home inputProps={inputProps} resultProteins={resultProteins} drawerProps={drawerProps} />} />
        <Route path="/result" element={<Result />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;
