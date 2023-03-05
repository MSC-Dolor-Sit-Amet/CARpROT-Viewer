import React, { useCallback } from 'react';
import { Checkbox, Stack, Text, Textarea, Divider, Box, useToast } from '@chakra-ui/react';
import { useDropzone } from 'react-dropzone';
import { InputProps, setSequenceType } from '../types/InputOutputProps';
import showError from '../utils/showError';

function SequenceDropZone({ setSequence, children }: { setSequence: setSequenceType; children?: React.ReactNode }) {
  const toast = useToast();

  const onDrop = useCallback(acceptedFiles => {
    acceptedFiles.forEach(file => {
      const reader = new FileReader();

      reader.onabort = () => showError('file reading was aborted', toast);
      reader.onerror = () => showError('file reading has failed', toast);
      reader.onload = () => {
        // Do whatever you want with the file contents
        const binaryStr = reader.result;

        if (!('TextEncoder' in window)) {
          showError('Sorry, this browser does not support TextEncoder...', toast);
        }

        const enc = new TextDecoder('utf-8');
        setSequence(enc.decode(binaryStr));
      };
      reader.readAsArrayBuffer(file);
    });
  }, []);
  const { getRootProps, getInputProps, open } = useDropzone({ onDrop, noClick: true });

  return (
    <Box display="flex" flexDirection="column" alignItems="center" {...getRootProps()}>
      <input {...getInputProps()} />
      {children}
      <Text onClick={open} color="gray.500">
        You can drag &apos;n&apos; drop sequence file onto text area or click here to open file browser
      </Text>
    </Box>
  );
}

function Input({ sequence, setSequence, directions, setDirections }: InputProps) {
  return (
    <Stack direction="column" spacing={4} padding="5" borderRadius="lg">
      <Stack direction="column" spacing={2}>
        <Text as="b">Sequence</Text>
        <SequenceDropZone setSequence={setSequence}>
          <Textarea
            value={sequence}
            onChange={e => setSequence(e.target.value)}
            placeholder="Enter sequence here..."
            size="lg"
            rows={8}
            spellCheck="false"
            resize="none"
          />
        </SequenceDropZone>
      </Stack>
      <Divider paddingY={3} />
      <Stack direction="column" spacing={2}>
        <Text as="b">DNA strands</Text>
        <Stack spacing={5} direction="row">
          <Checkbox
            value="forward"
            defaultChecked={directions.forward}
            onChange={e =>
              setDirections({
                ...directions,
                forward: e.target.checked,
              })
            }
          >
            Forward
          </Checkbox>
          <Checkbox
            value="reverse"
            defaultChecked={directions.reverse}
            onChange={e =>
              setDirections({
                ...directions,
                reverse: e.target.checked,
              })
            }
          >
            Reverse
          </Checkbox>
        </Stack>
      </Stack>
    </Stack>
  );
}

export default Input;
