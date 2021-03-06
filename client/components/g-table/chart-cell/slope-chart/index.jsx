import React, { Component } from 'react';
import d3 from 'd3';
import Axis from './axis.jsx';

class SlopeChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      series: props.series,
    };
    this.width = null;
    this.height = null;
    this.yScale = d3.scale.linear();
    this.circleRadius = 4;
    this.updateD3 = this.updateD3.bind(this);

    this.updateD3(props);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      series: nextProps.series,
    });

    this.updateD3(nextProps);
  }

  updateD3(props) {
    this.width = props.width - props.marginLeft - props.marginRight;
    this.height = props.height - props.marginTop - props.marginBottom;

    this.yScale
        .domain([0, 0.8])
        .range([0, this.height]);
  }

  render() {
    const translate = `translate(${this.props.marginLeft}, ${this.props.marginTop})`;
    const nulls = [];
    let axis = (
      <text
        textAnchor="start"
        x={8}
        y={22}
      >
        -
      </text>
    );
    let slopes = [];
    let slopeChart = null;

    slopes = this.state.series.map((series, i) => {
      const key = `slope${i}`;
      const circles = series.map((d, index, currentSeries) => {
        const arr = [];

        if (currentSeries[0]) {
          arr.push(
            <circle
              cx={this.circleRadius + 20}
              cy={this.height - this.yScale(currentSeries[0])}
              r={this.circleRadius}
            />,
          );
        }

        if (currentSeries[1]) {
          arr.push(
            <circle
              cx={this.width - this.circleRadius - 20}
              cy={this.height - this.yScale(currentSeries[1])}
              r={this.circleRadius}
            />,
          );
        }

        return arr;
      });

      if ((series[0]) && (series[1])) {
        return (
          <g
            className={`slope slope-${series[2]}`}
            transform={translate}
            key={key}
          >
            <line
              x1={this.circleRadius + 20}
              y1={this.height - this.yScale(series[0])}
              x2={this.width - this.circleRadius - 20}
              y2={this.height - this.yScale(series[1])}
            />
            {circles}
          </g>
        );
      }

      if ((series[0]) || (series[1])) {
        return (
          <g
            className={`slope slope-${series[2]}`}
            transform={translate}
            key={key}
          >
            {circles}
          </g>
        );
      }

      return null;
    });

    this.state.series.map((series, i) => {
      if (series[0] == null && series[1] == null) {
        nulls.push(i);
      }

      return null;
    });

    if (nulls.length < this.state.series[0].length) {
      axis = (
        <Axis
          width={this.props.width}
          height={this.height}
          axisMarginTop={this.props.marginTop}
          axisMarginLeft={this.props.marginLeft + this.circleRadius + 20}
          axisMarginRight={this.props.marginRight + this.circleRadius + 20}
          domain={[0, 0.8]}
          range={[this.height, 0]}
        />
      );
    }

    if (slopes.length === 0) {
      slopeChart = (
        <g>
          <text
            textAnchor="middle"
            x={this.props.width / 2}
            y={22}
          >
            Loading chart…
          </text>
        </g>
      );
    } else {
      slopeChart = (
        <g>
          {axis}
          {slopes}
        </g>
      );
    }

    return (
      <svg
        width={this.props.width}
        height={this.props.height}
      >
        {slopeChart}
      </svg>
    );
  }
}

SlopeChart.propTypes = {
  series: React.PropTypes.array.isRequired, // eslint-disable-line
  width: React.PropTypes.number.isRequired,
  height: React.PropTypes.number.isRequired,
  marginTop: React.PropTypes.number.isRequired,
  marginLeft: React.PropTypes.number.isRequired,
  marginRight: React.PropTypes.number.isRequired,
};

export default SlopeChart;
