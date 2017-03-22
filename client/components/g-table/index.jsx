import React, { Component } from 'react';
import { Table, Column, Cell } from 'fixed-data-table';

function TextCell(props) {
  return (
    <Cell>
      {props.data[props.rowIndex][props.field]}
    </Cell>
  );
}

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
        header={<Cell>Bank/Insurer</Cell>}
        cell={
          <TextCell
            data={props.data}
            field="bank"
          />
        }
        width={200}
      />
    </Table>
  );
}

GTable.propTypes = {
  data: React.PropTypes.array.isRequired, // eslint-disable-line
};

export default GTable;
