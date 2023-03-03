import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { Heading, useColorMode, Button, Flex, Spacer, useColorModeValue } from '@chakra-ui/react';
import React from 'react';

function Header({ btnRef, onOpen }) {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Flex bgColor={useColorModeValue('gray.100', 'gray.900')} color="white" padding="5" alignItems="center">
      <Button
        onClick={onOpen}
        ref={btnRef}
        variant="outline"
        _hover={{
          textDecoration: 'none',
          bg: useColorModeValue('gray.200', 'gray.800'),
        }}
      >
        Sequence
      </Button>
      <Spacer />
      <Button
        onClick={toggleColorMode}
        rightIcon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
        color="white"
        bgColor={useColorModeValue('blue.500', 'gray.800')}
        _hover={{
          textDecoration: 'none',
          bg: useColorModeValue('blue.300', 'gray.700'),
        }}
      >
        Toggle
      </Button>
    </Flex>
  );
}

export default Header;
