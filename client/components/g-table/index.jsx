import React, { Component } from 'react';
import { Table, Column, Cell } from 'fixed-data-table';

function TextCell(props) {
  const value = props.data[props.rowIndex][props.field];

  if (value === 'nd' || value == null) {
    return <Cell><em>No data</em></Cell>;
  }

  return <Cell>{value}</Cell>;
}

function IntegerCell(props) {
  const value = props.data[props.rowIndex][props.field];

  if (isNaN(value) || value == null) {
    return <Cell><em>No data</em></Cell>;
  }

  return <Cell>{value.toLocaleString('en-GB')}</Cell>;
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

      <Column
        header={<Cell>Total Employees</Cell>}
        cell={
          <IntegerCell
            data={props.data}
            field="employees"
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
