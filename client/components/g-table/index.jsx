import React from 'react';
import { Table, Column, Cell } from 'fixed-data-table';

function GTable() {
  return (
    <Table
      rowsCount={50}
      rowHeight={50}
      width={1000}
      height={500}
      headerHeight={50}
    >
      <Column
        cell={<Cell>Basic content</Cell>}
        width={200}
      />
    </Table>
  );
}

export default GTable;
