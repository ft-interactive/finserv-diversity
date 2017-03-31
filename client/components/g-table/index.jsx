import React, { Component } from 'react';
import { Table, Column, Cell } from 'fixed-data-table';
import throttle from 'lodash/throttle';
import ChartCell from './chart-cell/index.jsx';
import TouchExampleWrapper from './TouchExampleWrapper';

function TextCell(props) {
  const value = props.data[props.rowIndex][props.field];

  if (value === 'nd' || value == null) {
    return <Cell style={props.style}><em>-</em></Cell>;
  }

  return <Cell style={props.style}>{value}</Cell>;
}

function NumberCell(props) {
  const value = props.data[props.rowIndex][props.field];

  if (isNaN(value) || value == null) {
    return <Cell><em>-</em></Cell>;
  }

  return <Cell>{value.toLocaleString('en-GB')}</Cell>;
}

function PercentageCell(props) {
  const value = props.data[props.rowIndex][props.field];

  if (isNaN(value) || value == null) {
    return <Cell><em>-</em></Cell>;
  }

  return (
    <Cell style={{ width: '100%', textAlign: 'right' }}>
      {(value * 100).toFixed(1)}
    </Cell>
  );
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
      data: props.data,
      pageWidth: 0,
      tableWidth: 0,
      tableHeight: 0,
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
    const height = document.documentElement.clientHeight - 159 > 600 ?
      600 :
      document.documentElement.clientHeight - 159;

    this.setState({
      pageWidth: Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
      tableWidth: this.node.offsetWidth,
      tableHeight: height,
    });

    // console.log(this.state.tableHeight);
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
    let column1 = null;
    let column2 = null;
    let column3 = null;
    let column4 = null;
    let column5 = null;
    let column6 = null;

    column1 = (
      <Column
        header={
          <SortHeaderCell
            field="bank"
            value="Institution"
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
        width={151}
        flexGrow={1}
      />
    );

    column2 = (
      <Column
        header={
          <Cell className="chart-cell-header">
            <div className="title">Change 2014-16</div>
            <div className="legend">
              <div className="legend-bar legend-bar-jr" />
              <span className="legend-text">Junior</span>
              <div className="legend-bar legend-bar-mid" />
              <span className="legend-text">Mid</span>
              <div className="legend-bar legend-bar-sr" />
              <span className="legend-text">Senior</span>
            </div>
          </Cell>}
        cell={
          <ChartCell
            data={this.state.data}
          />
        }
        width={130}
      />
    );

    if (this.state.pageWidth >= 568) {
      column3 = (
        <Column
          header={
            <SortHeaderCell
              field="womentotal2016"
              value="Women total 2016 (%)"
              sortData={this.handleSortChange}
              currentSortField={this.state.sortField}
            />
          }
          cell={
            <PercentageCell
              data={this.state.data}
              field="womentotal2016"
            />
          }
          width={158}
          flexGrow={1}
        />
      );
    }

    if (this.state.pageWidth > 768) {
      column4 = (
        <Column
          header={
            <SortHeaderCell
              field="womenjr2016"
              value="Women junior 2016 (%)"
              sortData={this.handleSortChange}
              currentSortField={this.state.sortField}
            />
          }
          cell={
            <PercentageCell
              data={this.state.data}
              field="womenjr2016"
            />
          }
          width={165}
          flexGrow={1}
        />
      );
    }

    if (this.state.pageWidth >= 667) {
      column5 = (
        <Column
          header={
            <SortHeaderCell
              field="womenmid2016"
              value="Women mid 2016 (%)"
              sortData={this.handleSortChange}
              currentSortField={this.state.sortField}
            />
          }
          cell={
            <PercentageCell
              data={this.state.data}
              field="womenmid2016"
            />
          }
          width={152}
          flexGrow={1}
        />
      );
    }

    if (this.state.pageWidth > 768) {
      column6 = (
        <Column
          header={
            <SortHeaderCell
              field="womensr2016"
              value="Women senior 2016 (%)"
              sortData={this.handleSortChange}
              currentSortField={this.state.sortField}
            />
          }
          cell={
            <PercentageCell
              data={this.state.data}
              field="womensr2016"
            />
          }
          width={167}
          flexGrow={1}
        />
      );
    }

    return (
      <div ref={(node) => { this.node = node; }}>
        <div className="o-grid-container input-container">
          <div className="o-grid-row">
            <div data-o-grid-colspan="12 S11 Scenter M9 L8 XL7">
              <div className="input-label">Filter by institution</div>

              <input
                type="text"
                onChange={this.handleFilterChange}
                placeholder="Start typing an institution name"
              />

              <i className="icon-plus" />
            </div>
          </div>
        </div>

        <TouchExampleWrapper
          tableWidth={this.state.tableWidth}
          tableHeight={this.state.tableHeight}
        >
          <Table
            rowsCount={this.state.data.length}
            rowHeight={100}
            width={this.state.tableWidth}
            height={this.state.tableHeight}
            headerHeight={50}
            touchScrollEnabled
          >
            {column1}
            {column2}
            {column3}
            {column4}
            {column5}
            {column6}
          </Table>
        </TouchExampleWrapper>
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

PercentageCell.propTypes = {
  data: React.PropTypes.array, // eslint-disable-line
  rowIndex: React.PropTypes.number,
  field: React.PropTypes.string,
  style: React.PropTypes.object, // eslint-disable-line
};

PercentageCell.defaultProps = {
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
