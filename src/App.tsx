import React, { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useDisclosure } from '@chakra-ui/react';
import Header from './components/Header';
import Home from './views/Home';
import { SequenceType, DirectionsType, ResultProteinType } from './types/InputOutputProps';
import translate from './utils/translate';
import Result from './views/Result';

function App() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef<HTMLButtonElement | null>(null);

  const [sequence, setSequence] = React.useState<SequenceType>(localStorage.getItem('sequence') || '');

  const [directions, setDirections] = React.useState<DirectionsType>({ forward: true, reverse: true });

  const [resultProteins, setResultProteins] = React.useState<ResultProteinType[]>([]);

  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const handleTranslate = () => {
    const [sequences, proteins, images] = translate(sequence, directions);
    setIsLoading(true);

    Promise.all(proteins).then(p => {
      const peptides: ResultProteinType[] = [];

      // create array of sequence -> protein name
      sequences.forEach((element, i) => {
        peptides.push({ index: i, sequence: element, pdbId: p[i], imageSrc: images[i] });
      });

      setResultProteins(peptides);
      setIsLoading(false);
    });
  };

  useEffect(() => {
    localStorage.setItem('sequence', sequence);
  }, [sequence]);

  useEffect(() => {
    if (sequence) handleTranslate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const inputProps = {
    sequence,
    setSequence,
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
        <Route path="/" element={<Home inputProps={inputProps} resultProteins={resultProteins} drawerProps={drawerProps} isLoading={isLoading} />} />
        <Route path="/result" element={<Result />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;
