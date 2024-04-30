import React, { useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';
// import './stackedBarChart.css';

const BarChartComponent = () => {
  const [ data, setData ] = useState([])
  const url = 'https://zerosquadron.com'
  const ref = useRef();

  useEffect(() => {

    fetch(url)
      .then(resp => resp.json())
      .then(resp => resp.reduce((acc, temp, inx) => {
        if (inx % 5 === 0)
        {
          if (temp.tempf)
          {

            acc.push({ tempf: temp.tempf, createdAt: temp.createdAt })
          }
        }
        return acc
      }, []))
      .then(resp => setData(resp))
      .catch(err => console.error(err))

    if (data)
    {
      const margin = { top: 50, right: 30, bottom: 30, left: 60 },
        width = 920 - margin.left - margin.right,
        height = 800 - margin.top - margin.bottom;
      // append the svg object to the body of the page
      const svg = d3.select("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .style('backgournd', '#d3d3d3')
        .append("g")
        .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")")

      var x = d3.scaleLinear()
        .domain([ 0, data.length - 1 ])
        .range([ 0, width ]);
      svg.append("g")
        .attr("class", "myXaxis")   // Note that here we give a class to the X axis, to be able to call it later and modify it
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
      // .attr("opacity", "0")

      // Add Y axis
      var y = d3.scaleLinear()
        .domain([ 0, 500000 ])
        .range([ height, 0 ]);
      svg.append("g")
        .call(d3.axisLeft(y));

      // Add dots
      svg.append('g')
        .selectAll("dot")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", function (d) { return x(d.createdAt); })
        .attr("cy", function (d) { return y(d.tempf); })
        .attr("r", 1.5)
        .style("fill", "#69b3a2")

      // new X axis
      x.domain([ 0, 4000 ])
      svg.select(".myXaxis")
        .transition()
        .duration(2000)
        .attr("opacity", "1")
        .call(d3.axisBottom(x));

      svg.selectAll("circle")
        .transition()
        .delay(function (d, i) { return (i * 3) })
        .duration(2000)
        .attr("cx", function (d) { return x(d.GrLivArea); })
        .attr("cy", function (d) { return y(d.SalePrice); })
      console.log('BANG!!')
      console.log(data)
      svg.select(ref.current)
      svg.selectAll('circle')
        .data(data)
        .join(
          enter => enter.append('circle')
            .attr('r', value => value)
            .attr('cx', d => d * 2)
            .attr('cy', d => d * .25),

          update => update.attr('class', 'updated'),
          exit => exit.remove()
        )
    }
  }, [])

  return (
    <svg ref={ ref }></svg>
  )

}
export default BarChartComponent;


// export default App;








// function update(layout) {
//   layout === 'stacked' ? transitionStacked() : transitionGrouped()
// }

// return Object.assign(svg.node(), {
//   update
// })
// }
