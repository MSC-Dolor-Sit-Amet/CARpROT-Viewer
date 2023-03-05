import React, { useCallback } from 'react';
import { Checkbox, Stack, Text, Textarea, Divider, Box, useToast, Highlight, Button } from '@chakra-ui/react';
import { useDropzone } from 'react-dropzone';
import { InputProps, SetSequenceType } from '../types/InputOutputProps';
import showError from '../utils/showError';

function SequenceDropZone({ setSequence, children }: { setSequence: SetSequenceType; children: React.ReactNode }) {
  const toast = useToast();

  const onDrop = useCallback(
    (acceptedFiles: any) => {
      acceptedFiles.forEach((file: unknown) => {
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
          setSequence(enc.decode(binaryStr as BufferSource));
        };
        reader.readAsArrayBuffer(file as Blob);
      });
    },
    [setSequence, toast],
  );
  const { getRootProps, getInputProps, open } = useDropzone({ onDrop, noClick: true });

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Box display="flex" flexDirection="column" alignItems="center" {...getRootProps()}>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <input {...getInputProps()} />
      {children}
      <Text color="gray.500" display="inline-block" marginTop="1rem">
        You can drag &apos;n&apos; drop sequence file onto text area or click&nbsp;
        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
        <Button onClick={open} size="xs" paddingY="0" fontSize="1rem">
          here
        </Button>
        &nbsp;to open file browser
      </Text>
    </Box>
  );
}

function Input({ inputProps }: { inputProps: InputProps }) {
  const { sequence, setSequence, directions, setDirections } = inputProps;

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
