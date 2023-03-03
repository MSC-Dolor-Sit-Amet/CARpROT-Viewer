import React from 'react';
import { Stack } from '@chakra-ui/react';
import Viewer from '../components/Viewer';
import ChainView from '../components/ChainView';
import DrawerComponent from '../components/Drawer';

function Home({ drawerProps, inputProps, pdbId }) {
  return (
    <>
      <DrawerComponent drawerProps={drawerProps} inputProps={inputProps} />
      <Stack direction="column" spacing={4} maxWidth="1200" paddingX={5} marginX="auto" marginY={5} borderRadius="lg">
        <ChainView pdbId={pdbId} />
        <Viewer pdbId={pdbId} />
      </Stack>
    </>
  );
}

export default Home;
