import React, { createContext, useContext, useEffect, useState } from 'react';
import { useColorMode, useToken } from '@chakra-ui/react';
import ColorsProps from '../types/ColorsProps';

const defaultValue = {
  bgColor: '',
  panelsColor: '',
};

const ColorsContext = createContext(defaultValue);
const useColorsContext = () => useContext(ColorsContext);

function ColorsProvider({ children }: { children: React.ReactNode }) {
  const { colorMode } = useColorMode();

  const [colorsState, setColorsState] = useState<ColorsProps>(defaultValue);

  const [white, blue50, gray700, gray800] = useToken('colors', ['white', 'blue.50', 'gray.700', 'gray.800']);

  const bgColor = colorMode === 'light' ? white : gray800;
  const panelsColor = colorMode === 'light' ? blue50 : gray700;

  useEffect(() => {
    setColorsState({ bgColor, panelsColor });
  }, [bgColor, panelsColor]);

  return <ColorsContext.Provider value={colorsState}>{children}</ColorsContext.Provider>;
}

export { useColorsContext };

export default ColorsProvider;
