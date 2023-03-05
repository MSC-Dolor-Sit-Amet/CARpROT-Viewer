import { DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody, DrawerFooter, Button, Drawer } from '@chakra-ui/react';
import React from 'react';
import Input from './Input';
import DrawerProps from '../types/DrawerProps';
import { InputProps } from '../types/InputOutputProps';

function DrawerComponent({ drawerProps, inputProps }: { drawerProps: DrawerProps; inputProps: InputProps }) {
  const { isOpen, onClose, btnRef } = drawerProps;

  return (
    <Drawer isOpen={isOpen} placement="left" size="md" onClose={onClose} finalFocusRef={btnRef}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Input</DrawerHeader>

        <DrawerBody>
          <Input inputProps={inputProps} />
        </DrawerBody>

        <DrawerFooter>
          <Button variant="outline" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button
            colorScheme="blue"
            onClick={() => {
              inputProps.handleTranslate();
              onClose();
            }}
          >
            Save
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export default DrawerComponent;
