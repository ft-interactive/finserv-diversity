import React, { Component } from 'react';
import d3 from 'd3';

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
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      series: newProps.series,
    });
    this.updateD3(newProps);
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
    const slopes = this.state.series.map((d, i) => {
      const key = `line${i}`;

      if (!isNaN(d[0]) && !isNaN(d[1])) {
        return (
          <g
            className={`slope slope-${d[2]}`}
            transform={translate}
            key={key}
          >
            <line
              x1={this.circleRadius}
              y1={this.height - this.yScale(d[0])}
              x2={this.width - this.circleRadius}
              y2={this.height - this.yScale(d[1])}
            />
            <circle
              cx={this.circleRadius}
              cy={this.height - this.yScale(d[0])}
              r={this.circleRadius}
            />
            <circle
              cx={this.width - this.circleRadius}
              cy={this.height - this.yScale(d[1])}
              r={this.circleRadius}
            />
          </g>
        );
      }

      return null;
    });
    let slopeChart = null;

    if (slopes.length > 0) {
      slopeChart = slopes;
    } else {
      slopeChart = (
        <g>
          <text
            textAnchor="middle"
            x={this.props.width / 2}
            y={this.props.height / 2}
          >
            Loading chart…
          </text>
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
};

export default SlopeChart;
