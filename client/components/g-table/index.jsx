import React, { Component } from 'react';
import { Table, Column, Cell } from 'fixed-data-table';
import throttle from 'lodash/throttle';

function TextCell(props) {
  const value = props.data[props.rowIndex][props.field];

  if (value === 'nd' || value == null) {
    return <Cell style={props.style}><em>No data</em></Cell>;
  }

  return <Cell style={props.style}>{value}</Cell>;
}

function NumberCell(props) {
  const value = props.data[props.rowIndex][props.field];

  if (isNaN(value) || value == null) {
    return <Cell><em>No data</em></Cell>;
  }

  return <Cell>{value.toLocaleString('en-GB')}</Cell>;
}

class SortHeaderCell extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sortDirection: null,
    };
    this.handleSortChange = this.handleSortChange.bind(this);
  }

  handleSortChange(field, direction) {
    if (direction === 'descending') {
      this.setState({ sortDirection: 'ascending' });
    } else {
      this.setState({ sortDirection: 'descending' });
    }

    this.props.sortData(field, this.state.sortDirection);
  }

  render() {
    const field = this.props.field;
    const direction = this.state.sortDirection ? // eslint-disable-line
      (this.state.sortDirection === 'descending' ? this.state.sortDirection : 'ascending') :
      'descending';

    return (
      <Cell
        onClick={() => this.handleSortChange(field, direction)}
        className="sort-header"
      >
        {this.props.value}<i className="arrows-up-down" />
      </Cell>
    );
  }
}

class GTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: this.props.data,
      tableWidth: 0,
      sortField: null,
    };
    this.handleResize = this.handleResize.bind(this);
    this.handleFilterChange = this.handleFilterChange.bind(this);
    this.handleSortChange = this.handleSortChange.bind(this);
  }

  componentDidMount() {
    this.handleResize();

    window.addEventListener('resize', throttle(this.handleResize, 250));
  }

  handleResize() {
    this.setState({ tableWidth: this.node.offsetWidth });

    console.log(this.node.offsetWidth);
  }

  handleFilterChange(element) {
    const filterTerm = element.target.value.toLowerCase();
    const filteredData = [];

    for (const d of this.props.data) { // eslint-disable-line
      if (d.bank.toLowerCase().indexOf(filterTerm) !== -1) {
        filteredData.push(d);
      }
    }

    this.setState({ data: filteredData });
  }

  handleSortChange(field, direction) {
    const data = this.state.data;

    data.sort((a, b) => {
      if (isNaN(a[field])) {
        if (a[field].toLowerCase() < b[field].toLowerCase()) {
          return direction === 'ascending' ? -1 : 1;
        }

        if (a[field].toLowerCase() > b[field].toLowerCase()) {
          return direction === 'ascending' ? 1 : -1;
        }

        return 0;
      }

      if (a[field] < b[field]) {
        return direction === 'ascending' ? -1 : 1;
      }

      if (a[field] > b[field]) {
        return direction === 'ascending' ? 1 : -1;
      }

      return 0;
    });

    this.setState({
      data,
      sortField: field,
    });
  }

  render() {
    return (
      <div ref={(node) => { this.node = node; }}>
        <div className="o-grid-container">
          <div className="o-grid-row">
            <div data-o-grid-colspan="12 S11 Scenter M9 L8 XL7">
              <div className="input-label">Input label</div>

              <input
                onChange={this.handleFilterChange}
                placeholder="Filter by bank/insurer name"
              />

              <i className="icon-plus" />
            </div>
          </div>
        </div>

        <Table
          rowsCount={this.state.data.length}
          rowHeight={50}
          width={this.state.tableWidth}
          height={422}
          headerHeight={50}
        >
          <Column
            header={
              <SortHeaderCell
                field="bank"
                value="Bank/insurer"
                sortData={this.handleSortChange}
                currentSortField={this.state.sortField}
              />
            }
            cell={
              <TextCell
                data={this.state.data}
                field="bank"
              />
            }
            fixed
            width={161}
          />

          <Column
            header={<Cell>Sector</Cell>}
            cell={
              <TextCell
                data={this.state.data}
                field="sector"
                style={{ textTransform: 'capitalize' }}
              />
            }
            width={142}
          />

          <Column
            header={
              <SortHeaderCell
                field="employees"
                value="Total employees"
                sortData={this.handleSortChange}
                currentSortField={this.state.sortField}
              />
            }
            cell={
              <NumberCell
                data={this.state.data}
                field="employees"
              />
            }
            width={145}
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

TextCell.propTypes = {
  data: React.PropTypes.array, // eslint-disable-line
  rowIndex: React.PropTypes.number,
  field: React.PropTypes.string,
  style: React.PropTypes.object, // eslint-disable-line
};

TextCell.defaultProps = {
  rowIndex: 0,
  field: '',
};

NumberCell.propTypes = {
  data: React.PropTypes.array, // eslint-disable-line
  rowIndex: React.PropTypes.number,
  field: React.PropTypes.string,
};

NumberCell.defaultProps = {
  rowIndex: 0,
  field: '',
};

SortHeaderCell.propTypes = {
  sortData: React.PropTypes.func.isRequired,
  field: React.PropTypes.string.isRequired,
  value: React.PropTypes.string.isRequired,
};

GTable.propTypes = {
  data: React.PropTypes.array, // eslint-disable-line
};

export default GTable;
