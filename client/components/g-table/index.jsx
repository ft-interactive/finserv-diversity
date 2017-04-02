import React, { Component } from 'react';
import { Table, Column, Cell } from 'fixed-data-table';
import throttle from 'lodash/throttle';
import Twemoji from 'react-twemoji';
import ChartCell from './chart-cell/index.jsx';
import TouchExampleWrapper from './TouchExampleWrapper';

function TextCell(props) {
  const value = props.data[props.rowIndex][props.field];
  const emoji = props.data[props.rowIndex][props.emoji];

  if (value === 'nd' || value == null) {
    return <Cell style={props.style}><em>-</em></Cell>;
  }

  return (
    <Cell style={props.style}>
      {value}
      <Twemoji className="emoji-container">{emoji}</Twemoji>
    </Cell>
  );
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
  const style = { width: '100%', textAlign: 'right' };

  if (isNaN(value) || value == null) {
    return <Cell style={style}><em>-</em></Cell>;
  }

  return <Cell style={style}>{(value * 100).toFixed(1)}</Cell>;
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
      radioChecked: null,
      scrollToRow: null,
    };
    this.handleResize = this.handleResize.bind(this);
    this.handleTextInput = this.handleTextInput.bind(this);
    this.handleRadioInput = this.handleRadioInput.bind(this);
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
  }

  handleRadioInput(element) {
    const filterTerm = element.target.value;
    const filteredData = this.props.data
      .filter(d => d.sector.indexOf(filterTerm) !== -1);

    document.getElementById('institution').value = '';

    this.setState({
      data: filteredData,
      radioChecked: filterTerm,
      scrollToRow: 0,
    });
  }

  handleTextInput(element) {
    const filterTerm = element.target.value.toLowerCase();
    const filteredData = this.props.data
      .filter(d => d.bank.toLowerCase().indexOf(filterTerm) !== -1);

    this.setState({
      data: filteredData,
      radioChecked: null,
      scrollToRow: 0,
    });
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
      scrollToRow: 0,
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
            emoji="emoji"
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
        <article className="article">
          <div className="article-body o-typography-wrapper">
            <div>
              <div className="o-forms o-forms--wide">
                <label
                  className="o-forms__label"
                  htmlFor="all"
                >
                  Filter by sector
                </label>

                <input
                  type="radio"
                  onChange={this.handleRadioInput}
                  checked={!this.state.radioChecked}
                  value=""
                  className="o-forms__radio"
                  id="all"
                />

                <label
                  htmlFor="all"
                  className="o-forms__label"
                >
                  All
                </label>

                <input
                  type="radio"
                  onChange={this.handleRadioInput}
                  checked={this.state.radioChecked === 'asset manager'}
                  value="asset manager"
                  className="o-forms__radio"
                  id="asset-manager"
                />

                <label
                  htmlFor="asset-manager"
                  className="o-forms__label"
                >
                  Asset manager
                </label>

                <input
                  type="radio"
                  onChange={this.handleRadioInput}
                  checked={this.state.radioChecked === 'bank'}
                  value="bank"
                  className="o-forms__radio"
                  id="bank"
                />

                <label
                  htmlFor="bank"
                  className="o-forms__label"
                >
                  Bank
                </label>

                <input
                  type="radio"
                  onChange={this.handleRadioInput}
                  checked={this.state.radioChecked === 'insurance'}
                  value="insurance"
                  className="o-forms__radio"
                  id="insurance"
                />

                <label
                  htmlFor="insurance"
                  className="o-forms__label"
                >
                  Insurance
                </label>

                <input
                  type="radio"
                  onChange={this.handleRadioInput}
                  checked={this.state.radioChecked === 'professional services'}
                  value="professional services"
                  className="o-forms__radio"
                  id="professional-services"
                />

                <label
                  htmlFor="professional-services"
                  className="o-forms__label"
                >
                  Professional services
                </label>

                <label
                  htmlFor="institution"
                  className="o-forms__label"
                >
                  <span className="or">—OR—</span>
                  Filter by institution
                </label>

                <input
                  type="text"
                  onChange={this.handleTextInput}
                  placeholder="Start typing an institution name"
                  id="institution"
                  className="o-forms__text o-forms__text--valid"
                />
              </div>
            </div>
          </div>
        </article>

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
            scrollToRow={this.state.scrollToRow}
          >
            {column1}
            {column2}
            {column3}
            {column4}
            {column5}
            {column6}
          </Table>
        </TouchExampleWrapper>

        <article className="article">
          <div className="article-body o-typography-wrapper">
            <div className="notes">
              * 2014 data for period January 1, 2014-January 1, 2015<br />
              ** Includes FT estimates<br />
              *** Prior year is 2015<br />
              <Twemoji className="emoji-container emoji-container-notes">🇺🇸</Twemoji>
              <span>&nbsp;Data for US employees only</span><br />
              <Twemoji className="emoji-container emoji-container-notes">🇬🇧</Twemoji>
              <span>&nbsp;Data for UK employees only</span><br />
              <Twemoji className="emoji-container emoji-container-notes">🇯🇵</Twemoji>
              <span>&nbsp;Data for Japan employees only</span><br />
              <Twemoji className="emoji-container emoji-container-notes">🇬🇧🇮🇪</Twemoji>
              <span style={{ marginLeft: '14px' }}>&nbsp;Data for UK and Ireland employees only</span><br />
            </div>
          </div>
        </article>
      </div>
    );
  }
}

TextCell.propTypes = {
  data: React.PropTypes.array, // eslint-disable-line
  rowIndex: React.PropTypes.number,
  field: React.PropTypes.string,
  style: React.PropTypes.object, // eslint-disable-line
  emoji: React.PropTypes.string,
};

TextCell.defaultProps = {
  rowIndex: 0,
  field: '',
  emoji: '',
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
