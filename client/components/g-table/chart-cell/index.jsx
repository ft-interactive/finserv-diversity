import React, { Component } from 'react';
import { Cell } from 'fixed-data-table-2';
import SlopeChart from './slope-chart/index.jsx';

class ChartCell extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.data[props.rowIndex],
    };
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      data: newProps.data[newProps.rowIndex],
    });
  }

  render() {
    const series = [
      [this.state.data.womenjr2014, this.state.data.womenjr2016, 'j'],
      [this.state.data.womenmid2014, this.state.data.womenmid2016, 'm'],
      [this.state.data.womensr2014, this.state.data.womensr2016, 's'],
    ];

    const params = {
      width: this.props.width,
      height: this.props.height,
      marginTop: 8,
      marginRight: 8,
      marginBottom: 8,
      marginLeft: 8,
    };

    return (
      <Cell className="chart-cell">
        <SlopeChart
          {...params}
          series={series}
        />
      </Cell>
    );
  }
}

ChartCell.propTypes = {
  data: React.PropTypes.array, // eslint-disable-line
  width: React.PropTypes.number,
  height: React.PropTypes.number,
  rowIndex: React.PropTypes.number,
};

ChartCell.defaultProps = {
  width: 0,
  height: 0,
  rowIndex: 0,
};

export default ChartCell;
