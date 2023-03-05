import React, { useCallback, useMemo, useState } from 'react';
import { Stage, Component, RepresentationDescriptor, Position } from 'react-ngl';
import { Box, Button, Menu, MenuButton, MenuItemOption, MenuList, MenuOptionGroup, Stack, useToast } from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { useColorsContext } from '../providers/ColorsContext';
import showError from '../utils/showError';

type ViewerProps = {
  pdbId: string | null;
};

const makeRoute = (pdbId: string, reduced: boolean) => `rcsb://${pdbId}${reduced ? '.bb' : ''}.mmtf?ts=${Date.now()}`;

function Viewer({ pdbId }: ViewerProps) {
  const colors = useColorsContext();

  const reduced = false;
  const reprList = useMemo(
    () => ({
      backbone: [
        {
          type: 'backbone',
        },
      ],
      'ball+stick': [
        {
          type: 'ball+stick',
        },
      ],
      cartoon: [
        {
          type: 'cartoon',
        },
      ],
      helixorient: [
        {
          type: 'helixorient',
        },
      ],
      hyperball: [
        {
          type: 'hyperball',
        },
      ],
      licorice: [
        {
          type: 'licorice',
        },
      ],
      'ribbon and line': [
        {
          type: 'ribbon',
          param: {
            color: 'atomindex',
          },
        },
        {
          type: 'line',
          param: {
            color: 'element',
          },
        },
      ],
      rocket: [
        {
          type: 'rocket',
        },
      ],
      spacefill: [
        {
          type: 'spacefill',
          param: {
            color: 'element',
          },
        },
      ],
      surface: [
        {
          type: 'surface',
          param: {
            color: 'element',
          },
        },
      ],
    }),
    [],
  );

  const [hasLoaded, setHasLoaded] = useState(false);

  const [cameraState, setCameraState] = useState({});

  const [reprName, setReprName] = useState('cartoon');
  const handleReprChange = useCallback(name => setReprName(name), []);

  const onLoaded = () => {
    if (!hasLoaded) {
      setHasLoaded(true);
      setCameraState({});
    }
  };

  const toast = useToast();

  return pdbId ? (
    <Stack direction="column" borderRadius="lg" overflow="hidden" height="50vh" bgColor={colors.panelsColor} alignItems="start" position="relative">
      <Box position="absolute" zIndex={1000} top={5} left={5}>
        <Menu>
          <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
            {reprName}
          </MenuButton>
          <MenuList>
            <MenuOptionGroup type="radio" onChange={val => handleReprChange(val)} value={reprName}>
              {Object.keys(reprList).map(name => (
                <MenuItemOption value={name}>{name}</MenuItemOption>
              ))}
            </MenuOptionGroup>
          </MenuList>
        </Menu>
      </Box>
      <Stage width="100%" height="100%" cameraState={cameraState} params={{ backgroundColor: colors.panelsColor }}>
        <Component
          path={makeRoute(pdbId, reduced)}
          reprList={reprList[reprName]}
          onLoad={onLoaded}
          onLoadFailure={() => showError('3D view loading failed', toast)}
        />
      </Stage>
    </Stack>
  ) : null;
}

export default Viewer;
