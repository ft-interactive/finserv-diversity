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
          height={422}
          headerHeight={50}
        >
          <Column
            header={<Cell>Bank/insurer</Cell>}
            cell={
              <TextCell
                data={this.state.data}
                field="bank"
              />
            }
            fixed={true}
            width={161}
          />

          <Column
            header={<Cell>Total employees</Cell>}
            cell={
              <IntegerCell
                data={this.state.data}
                field="employees"
              />
            }
            width={142}
          />

          <Column
            header={<Cell>Total women</Cell>}
            cell={
              <IntegerCell
                data={this.state.data}
                field="womentotal"
              />
            }
            width={142}
          />

          <Column
            header={<Cell>2016 total women</Cell>}
            cell={
              <TextCell
                data={this.state.data}
                field="womentotal2016"
              />
            }
            width={142}
          />

          <Column
            header={<Cell>2016 junior women</Cell>}
            cell={
              <TextCell
                data={this.state.data}
                field="womenjr2016"
              />
            }
            width={142}
          />

          <Column
            header={<Cell>2016 middle women</Cell>}
            cell={
              <TextCell
                data={this.state.data}
                field="womenmid2016"
              />
            }
            width={142}
          />

          <Column
            header={<Cell>2016 senior women</Cell>}
            cell={
              <TextCell
                data={this.state.data}
                field="womensr2016"
              />
            }
            width={142}
          />

          <Column
            header={<Cell>2014 junior women</Cell>}
            cell={
              <TextCell
                data={this.state.data}
                field="womenjr2014"
              />
            }
            width={142}
          />

          <Column
            header={<Cell>2014 middle women</Cell>}
            cell={
              <TextCell
                data={this.state.data}
                field="womenmid2014"
              />
            }
            width={142}
          />

          <Column
            header={<Cell>2014 senior women</Cell>}
            cell={
              <TextCell
                data={this.state.data}
                field="womensr2014"
              />
            }
            width={142}
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
