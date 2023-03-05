import { Box, Image, Text } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import getPeptideImage from '../utils/images';

function ImageViewer({ sequence }: { sequence: string }) {
  const [image, setImage] = React.useState<string>('');

  useEffect(() => {
    if (!sequence) return;
    setImage(getPeptideImage(sequence));
  }, [sequence]);

  const [loading, setLoading] = React.useState(true);

  return (
    <Box height="16rem" overflowX="hidden" display="flex" justifyContent="center" alignItems="center">
      {loading ? (
        <Text textAlign="center" fontSize="xl" fontWeight="bold" color="gray.500">
          Loading image...
        </Text>
      ) : null}
      <Box height="100%" overflowX="auto">
        <Image height="100%" maxWidth="unset" src={image} onLoad={() => setLoading(false)} alt="" />
      </Box>
    </Box>
  );
}

export default ImageViewer;
