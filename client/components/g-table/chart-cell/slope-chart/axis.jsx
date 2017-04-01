import React, { Component } from 'react';
import d3 from 'd3';

class Axis extends Component {
  constructor(props) {
    super(props);

    this.yScale = d3.scale.linear();
    this.axisLeft = d3.svg.axis()
      .scale(this.yScale)
      .orient('left')
      .tickValues([0, 0.5, 0.8])
      .tickSize((props.width - props.axisMarginLeft - props.axisMarginRight) * -1)
      .tickFormat(d => `${d * 100}%`);
    this.axisRight = d3.svg.axis()
      .scale(this.yScale)
      .orient('right')
      .ticks(0)
      .tickSize(0, 0);
    this.updateD3 = this.updateD3.bind(this);

    this.updateD3(props);
  }

  componentDidMount() { this.renderAxis(); }

  componentWillReceiveProps(newProps) {
    this.updateD3(newProps);
  }

  componentDidUpdate() { this.renderAxis(); }

  updateD3(props) {
    this.yScale
      .domain(props.domain)
      .range(props.range);
  }

  renderAxis() {
    d3.select(this.nodeLeft).call(this.axisLeft);
    d3.select(this.nodeRight).call(this.axisRight);

    d3.selectAll('g.tick')
        .filter(d => d === 0.5)
      .select('line')
        .attr('class', 'equality');
  }

  render() {
    const translateLeft = `translate(${this.props.axisMarginLeft}, ${this.props.axisMarginTop})`;
    const translateRight = `translate(${this.props.width + this.props.axisMarginRight}, ${this.props.axisMarginTop})`;

    return (
      <g>
        <g
          className="axis"
          transform={translateLeft}
          ref={node => (this.nodeLeft = node)}
        >
          <g>
            <text
              textAnchor="middle"
              x={(this.props.width - this.props.axisMarginLeft - this.props.axisMarginRight) / 2}
              y={28}
            >
              EQUALITY
            </text>
          </g>
        </g>
        <g
          className="axis"
          transform={translateRight}
          ref={node => (this.nodeRight = node)}
        />
      </g>
    );
  }
}

Axis.propTypes = {
  width: React.PropTypes.number,
  axisMarginTop: React.PropTypes.number.isRequired,
  axisMarginLeft: React.PropTypes.number.isRequired,
  axisMarginRight: React.PropTypes.number.isRequired,
  domain: React.PropTypes.array.isRequired, // eslint-disable-line
  range: React.PropTypes.array.isRequired, // eslint-disable-line
};

Axis.defaultProps = {
  width: 0,
};

export default Axis;
