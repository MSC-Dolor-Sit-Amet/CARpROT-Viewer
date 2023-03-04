import { ChevronLeftIcon, MoonIcon, SunIcon } from '@chakra-ui/icons';
import { useColorMode, Button, Flex, Spacer, useColorModeValue } from '@chakra-ui/react';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function LeftButton({ path, onOpen, btnRef }) {
  const hoverColorModeValue = useColorModeValue('primary.300', 'primary.300');

  const navigate = useNavigate();

  switch (path) {
    case '/result':
      return (
        <Button
          leftIcon={<ChevronLeftIcon />}
          onClick={() => navigate('/')}
          variant="solid"
          _hover={{
            textDecoration: 'none',
            bg: hoverColorModeValue,
          }}
        >
          Back
        </Button>
      );
    case '/':
      return (
        <Button
          onClick={onOpen}
          ref={btnRef}
          variant="solid"
          _hover={{
            textDecoration: 'none',
            bg: hoverColorModeValue,
          }}
        >
          Input
        </Button>
      );
    default:
      break;
  }
  return null;
}

function Header({ btnRef, onOpen }) {
  const { colorMode, toggleColorMode } = useColorMode();

  const location = useLocation();

  return (
    <Flex bgColor={useColorModeValue('gray.100', 'gray.900')} color="white" padding={5} gap={5} alignItems="center">
      <LeftButton path={location.pathname} onOpen={onOpen} btnRef={btnRef} />
      <Spacer />
      <Button
        onClick={toggleColorMode}
        rightIcon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
        color={useColorModeValue('gray.700', 'gray.100')}
        bgColor={useColorModeValue('primary.200', 'gray.800')}
        _hover={{
          textDecoration: 'none',
          bg: useColorModeValue('primary.300', 'gray.700'),
        }}
      >
        Toggle
      </Button>
    </Flex>
  );
}

export default Header;
