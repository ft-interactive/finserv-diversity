import React from 'react';
import { Table, Column, Cell } from 'fixed-data-table';

function GTable(props) {
  return (
    <Table
      rowsCount={props.data.length}
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

GTable.propTypes = {
  data: React.PropTypes.array.isRequired, // eslint-disable-line
};

export default GTable;
