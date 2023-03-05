import { TableContainer, Table, Thead, Tr, Th, Tbody, Td } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { PropertiesType } from '../types/PropertiesType';
import getProperties from '../utils/properties/peptideProperties';

function PropertiesTable({ sequence }: { sequence: string }) {
  const [properties, setProperies] = React.useState<PropertiesType[]>([]);

  useEffect(() => {
    if (!sequence) return;
    setProperies(getProperties(sequence));
  }, [sequence]);

  return (
    <TableContainer>
      <Table>
        <Thead>
          <Tr>
            <Th>Property</Th>
            <Th>Value</Th>
            <Th>Unit</Th>
          </Tr>
        </Thead>
        <Tbody>
          {properties.map(prop => (
            <Tr key={prop.name}>
              <Td userSelect="text">{prop.name}</Td>
              <Td userSelect="text">{prop.value}</Td>
              <Td userSelect="text">{prop.unit}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}

export default PropertiesTable;
