import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { Heading, useColorMode, Button, Flex, Spacer } from '@chakra-ui/react';
import React from 'react';

function Header() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Flex bgColor="blue.300" color="white" padding="5" alignItems="center">
      <Heading as="h1" size="lg">
        Translation app
      </Heading>
      <Spacer />
      <Button onClick={toggleColorMode} rightIcon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />} color="white">
        Toggle
      </Button>
    </Flex>
  );
}

export default Header;
