import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useDisclosure } from '@chakra-ui/react';
import Header from './components/Header';
import Home from './views/Home';

function App() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

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
        <Route path="/" element={<Home drawerProps={drawerProps} />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;
