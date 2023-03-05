/* eslint-disable react/require-default-props */
import { ChevronLeftIcon, MoonIcon, SunIcon } from '@chakra-ui/icons';
import { useColorMode, Button, Flex, Spacer, useColorModeValue, Image, Heading } from '@chakra-ui/react';
import React, { LegacyRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function LeftButton({ path, onOpen, btnRef }: { path?: string; onOpen: () => void; btnRef: React.RefObject<HTMLButtonElement | null> }) {
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
          ref={btnRef as LegacyRef<HTMLButtonElement> | undefined}
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

function Header({ btnRef, onOpen }: { btnRef: React.RefObject<HTMLButtonElement | null>; onOpen: () => void }) {
  const { colorMode, toggleColorMode } = useColorMode();

  const location = useLocation();

  return (
    <Flex bgColor={useColorModeValue('gray.100', 'gray.900')} color="white" padding={5} gap={5} alignItems="center">
      <LeftButton path={location.pathname} onOpen={onOpen} btnRef={btnRef} />
      <Spacer />
      <Flex alignItems="center" gap={3}>
        <Image src="./icon.svg" alt="logo" height="2rem" />
        <Heading size="md" color={useColorModeValue('gray.700', 'gray.100')}>
          CARpROT Viewer
        </Heading>
      </Flex>
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
