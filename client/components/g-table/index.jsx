import React, { Component } from 'react';
import { Table, Column, Cell } from 'fixed-data-table';
import throttle from 'lodash/throttle';

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

class GTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: this.props.data,
      tableWidth: 0,
    };
    this.handleResize = this.handleResize.bind(this);
  }

  componentDidMount() {
    this.handleResize();

    window.addEventListener('resize', throttle(this.handleResize, 250));
  }

  handleResize() {
    this.setState({ tableWidth: this.node.offsetWidth });

    console.log(this.node.offsetWidth);
  }

  render() {
    return (
      <div ref={node => { this.node = node; }}>
        <Table
          rowsCount={this.state.data.length}
          rowHeight={50}
          width={this.state.tableWidth}
          height={this.state.data.length * 52}
          headerHeight={50}
          footerHeight={50}
        >
          <Column
            header={<Cell>Bank/Insurer</Cell>}
            cell={
              <TextCell
                data={this.state.data}
                field="bank"
              />
            }
            width={200}
          />

          <Column
            header={<Cell>Total Employees</Cell>}
            cell={
              <IntegerCell
                data={this.state.data}
                field="employees"
              />
            }
            width={200}
          />
        </Table>
      </div>
    );
  }
}

GTable.propTypes = {
  data: React.PropTypes.array.isRequired, // eslint-disable-line
};

export default GTable;
