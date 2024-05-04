import React, { useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';
import './stackedBarChart.css';

const BarChartComponent = () => {
  const [ data, setData ] = useState([])
  const url = 'https://zerosquadron.com'
  const svgRef = useRef();

  useEffect(() => {
    let prevTemp = 0

    fetch(url)
      .then(resp => resp.json())
      .then(resp => resp.reduce((acc, temp, inx) => {
        if (inx % 10 === 0)
        {
          if (temp.tempf)
          {
            prevTemp = temp.tempf > prevTemp ? temp.tempf : prevTemp
            acc.push( temp.tempf)
          }
        }
        console.log('acc', acc)
        return acc
      }, []))
      .then(resp => setData(resp))
      .catch(err => console.error(err))
    console.log('HIGH', prevTemp)

    const margin = { top: 50, right: 30, bottom: 30, left: 60 },
      width = 1000 - margin.left - margin.right,
      height = 750 - margin.top - margin.bottom;

    if (data)
    {
      
    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height)

    let xScale = d3.scaleBand()
      .range([0, width])
      .domain(data)

    let yScale = d3.scaleLinear()
      .range([height, 0])
      .domain([0, 100])

    let g = svg.append('g')
      .attr(`transform`, `translate(0, ${height})`)
      .call(d3.axisBottom(xScale).ticks(20).tickFormat(d => `sale: ${d}`))

    g.append('g')
      .call(d3.axisLeft(yScale).tickFormat(d => `$${d}`).ticks(4))

    g.selectAll('.bar')
      .data(data)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', d => xScale(d))
      .attr('y', d => yScale(d))
      .attr('width', xScale.bandwidth())
      .attr('height', d => height - yScale(d))


      //
      // // append the svg object to the body of the page
      // const svg = d3.select(svgRef.current)
      //   .attr("width", width + margin.left + margin.right)
      //   .attr("height", height + margin.top + margin.bottom)
      //   .style('background', '#d3d3d3')
      //   // .append("g")
      //   // .attr("transform",
      //   //   "translate(" + margin.left + "," + margin.top + ")")

      // var xScale = d3.scaleTime()
      //   .range([ margin.left, width - margin.right])
      //   .domain([0, data.length - 1]);

      // let yScale = d3.scaleLinear()
      //   .domain([0,height])
      //   .range([height - margin.bottom - margin.top, margin.top])

      // const xLabel = "Time"
      // const yLabel = "Temp"
      // const locationName = "Home-Oakland"

      // svg
      //   .append('text')
      //   .attr('class', 'svg-title')
      //   .attr('x', (width - margin.right + margin.left) / 2)
      //   .attr('y', margin.top / 2)
      //   .attr('text-anchor', 'middle')
      //   .style('font-size', '22px')
      //   .text(`${yLabel} of ${locationName}`);

      // svg
      //   .append('text')
      //   .attr('text-anchor', 'middle')
      //   .attr('transform',
      //         `translate( ${margin.left - 70},
      //           ${(height - margin.top - margin.bottom + 180) / 2 } ) rotate(-90)`
      //   )
      //   .style('font-size', '26px')
      //   .text(yLabel)

      // svg
      //   .append('text')
      //   .attr('class', 'svg-title')
      //   .attr('x', (width - margin.right + margin.left) / 2)
      //   .attr('y', height - margin.bottom - margin.top + 60)
      //   .attr('text-anchor', 'middle')
      //   .style('font-size', '26px')
      //   .text(xLabel)
              
      // const generateScaledLine = d3.line()
      //   .x((d,i) => xScale(i))
      //   .y(yScale)
      //   .curve(d3.curveCardinal)

      // svg.selectAll('.line')
      //   .data(data)
      //   .join('path')
      //     .attr('d', d => generateScaledLine(d))
      //     .attr('fill', 'none)')
      //     .attr('stroke', 'black')

      // const startTime = d => new Date(d[0].createdAt)
      // const temp = d => +d.tempf

      // const lineGenerator = d3.line()
      //     .x(d => xScale(startTime(startTime(d))))
      //     .y(d => yScale(temp(d)))
      //     .curve(d3.curveBasis)

      //   xScale.domain(d3.extent(data, startTime)).nice(ticks);
      //   yScale.domain(d3.extent(data, temp)).nice(ticks);
      //   // add the line path
      //   svg
      //     .append("path")
      //     .attr("fill", "none")
      //     .attr("stroke", "steelblue")
      //     .attr("stroke-width", 4)
      //     .attr("d", line_generator(d)); // generate the path


      // svg.append("g")
      //   .attr("class", "myXaxis")   // Note that here we give a class to the X axis, to be able to call it later and modify it
      //   .attr("transform", "translate(0," + height + ")")
      //   .call(d3.axisBottom(x))
      // .attr("opacity", "0")

      // Add Y axis
      // var y = d3.scaleLinear()
      //   .range([ height + margin.top, margin.bottom ])
      //   .domain([ 50, 70 ]);

      // svg.append("g")
      //   .attr("class", "yAxis")
      //   .call(d3.axisLeft(y));

    }
  }, [])

  return (
    <svg ref={ svgRef }></svg>
  )

}
export default BarChartComponent;