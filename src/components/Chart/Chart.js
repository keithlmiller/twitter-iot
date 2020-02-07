import React, { Component } from 'react';
import * as d3 from 'd3';
import './Chart.scss';

const margin = { top: 20, right: 20, bottom: 20, left: 150 };

class Chart extends Component {
  state = {
    bars: [],
  };

  xAxisLines = d3.axisBottom();
  xAxis = d3.axisBottom();
  yAxis = d3.axisLeft();

  static getDerivedStateFromProps(nextProps, prevState) {
    const { words, width, height } = nextProps;

    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;

    if (!words) return {};

    const titles = words.map(d => d[0]);
    const values = words.map(d => d[1]);

    const yScale = d3
      .scaleBand()
      .domain(titles)
      .range([0, chartHeight])
      .paddingInner(.35)
      .paddingOuter(.25);

    const xScale = d3
      .scaleLinear()
      .domain([0, d3.max(values)])
      .range([0, chartWidth]);

    const bars = words.map(d => {
      return {
        x: margin.left,
        y: yScale(d[0]),
        width: xScale(d[1]),
        value: d[1],
        title: d[0],
      };
    });

    return { bars, xScale, yScale };
  }

  render() {
    const {
      bars,
      yScale,
    } = this.state;

    const { 
      width, 
      height, 
    } = this.props;


    return (
      <div className='chart'>
        <h3>Top 20 Words by Total Occurences</h3>

        <svg width={width} height={height}>
          <g ref='bars'>
            {bars.map(d => {
              const textYPos = d.y + yScale.bandwidth() - 5;

              return (
                <React.Fragment key={d.title}>
                  <rect
                      className='chart__bar'
                      width={d.width}
                      y={d.y} height={yScale.bandwidth()}
                      fill='red'
                    />
                  <text x={10} y={textYPos} className='chart__bar--value'>{d.title}</text>
                  <text x={width-100} y={textYPos} className='chart__bar--value'>{d.value}x</text>
                </React.Fragment>
              )
            })}
          </g>
        </svg>
      </div>
    );
  }
}

export default Chart;
