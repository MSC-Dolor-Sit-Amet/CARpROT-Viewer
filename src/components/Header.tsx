import { ChevronDownIcon, MoonIcon, SunIcon } from '@chakra-ui/icons';
import {
  Heading,
  useColorMode,
  Button,
  Flex,
  Spacer,
  useColorModeValue,
  Menu,
  MenuButton,
  MenuList,
  MenuOptionGroup,
  MenuItemOption,
} from '@chakra-ui/react';
import React from 'react';

function Header({ btnRef, onOpen, resultProteins, setPdbId }) {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Flex bgColor={useColorModeValue('gray.100', 'gray.900')} color="white" padding={5} gap={5} alignItems="center">
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
      <Menu>
        <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
          Protein
        </MenuButton>
        <MenuList>
          <MenuOptionGroup
            type="radio"
            onChange={val => {
              setPdbId(val);
            }}
          >
            {resultProteins.map((protein: string) => (
              <MenuItemOption value={protein}>{protein}</MenuItemOption>
            ))}
          </MenuOptionGroup>
        </MenuList>
      </Menu>
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
