import React from 'react';
import { Box, Card, CardBody, Code, FormControl, FormLabel, Heading, HStack, Link, LinkOverlay, Stack, Switch } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import DrawerComponent from '../components/Drawer';
import DrawerProps from '../types/DrawerProps';
import { InputProps, ResultProteinType } from '../types/InputOutputProps';

function Home({
  drawerProps,
  inputProps,
  resultProteins,
  isLoading,
}: {
  drawerProps: DrawerProps;
  inputProps: InputProps;
  resultProteins: ResultProteinType[];
  isLoading: boolean;
}) {
  const [protsState, setProtsState] = React.useState(true);
  const [nonProtsState, setNonProtsState] = React.useState(true);

  return (
    <>
      <DrawerComponent drawerProps={drawerProps} inputProps={inputProps} />
      <Stack direction="column" flexGrow={1} spacing={4} width="100%" maxWidth="1200" marginX="auto" padding={5} borderRadius="lg">
        <Stack
          direction="column"
          flexGrow={1}
          spacing={4}
          padding={5}
          borderRadius="lg"
          border="solid 1px"
          borderColor="var(--chakra-colors-chakra-border-color)"
        >
          <HStack spacing="24px" justify="end">
            <FormControl display="flex" width="auto">
              <FormLabel htmlFor="prots" mb="0">
                Proteins
              </FormLabel>
              <Switch
                id="prots"
                isChecked={protsState}
                onChange={e => {
                  setProtsState(e.target.checked);
                }}
              />
            </FormControl>
            <FormControl display="flex" width="auto">
              <FormLabel htmlFor="non-prots" mb="0">
                Non-protein sequences
              </FormLabel>
              <Switch
                id="non-prots"
                isChecked={nonProtsState}
                onChange={e => {
                  setNonProtsState(e.target.checked);
                }}
              />
            </FormControl>
          </HStack>
          {isLoading ? (
            <Box display="flex" flexGrow="1" flexDirection="column" justifyContent="center" alignItems="center">
              <Heading size="lg" color="gray.500">
                Loading...
              </Heading>
            </Box>
          ) : (
            resultProteins.map(protein =>
              (protein.pdbId && protsState) || (!protein.pdbId && nonProtsState) ? (
                <Link as={RouterLink} to={`/result?sequence=${protein.sequence}${protein.pdbId ? `&pdbid=${protein.pdbId}` : ''}`}>
                  <Card
                    direction={{ base: 'column', sm: 'row' }}
                    variant="filled"
                    key={protein.index}
                    transition="all 0.2s"
                    _hover={{
                      transform: 'translateY(-3px)',
                    }}
                  >
                    <Stack>
                      <CardBody>
                        <Heading size="md">{protein.pdbId ? `Protein ${protein.pdbId}` : 'Sequence'}</Heading>

                        <Code marginTop={5} wordBreak="break-all">
                          {protein.sequence}
                        </Code>
                      </CardBody>
                    </Stack>
                  </Card>
                </Link>
              ) : null,
            )
          )}
        </Stack>
      </Stack>
    </>
  );
}

export default Home;
