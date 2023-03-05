import { TableContainer, Table, Thead, Tr, Th, Tbody, Td } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import getProperties from '../utils/peptideProperties';

function PropertiesTable({ sequence }) {
  const [properties, setProperies] = React.useState([]);

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
              <Td>{prop.name}</Td>
              <Td>{prop.value}</Td>
              <Td>{prop.unit}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}

export default PropertiesTable;
