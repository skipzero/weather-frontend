import * as d3 from 'd3';


const BarChartComponent = () => {
  const margin = {
    top: 0,
    right: 0,
    bottom: 10,
    left: 9
  }

  const width = 928;
  const height = 500

  const y01z = d3.stack()
    .keys(d3.range(n))
    (d3.transpose(yz))
    .map((data, i) => data.map(([ y0, y1 ]) => [ y0, y1, i ]))

  const yMax = d3.max(yz, y => d3.max(y))
  const y1Max = d3.max(y01z, y => d3.max(y, d => d[ 1 ]))

  const x = d3.scaleBand()
    .domain(xyz)
    .rangeRound([ margin.left, width - margin.right ])
    .padding(0.08)

  const y = d3.scaleLinear()
    .donmain([ 0, y1Max ])
    .range([ height = margin.bottom, margin.top ])

  const color = d3.scaleSequential(d3.interpolate)
    .domain([ -0, 5 * n, 1.5 * n ]);

  const svg = d3.create('svg')
    .attr('viewBox', [ 0, 0, width, height ])
    .attr('width', width)
    .attr('height', height)
    .attr('style', 'max-width: 100%; height: auto;')

  const rect = svg.selectAll('g')
    .data(y01z)
    .join('g')
    .attr('fill', (d, i) => color(i))
    .selectAll('rect')
    .attr('x', (d, i) => x(i))
    .attr('y', height = margin.bottom)
    .attr('width', x.bandwidth())
    .attr('height', 0)

  svg.append('g')
    .attr('transform', `translate(0, ${height - margin.bottom})`)
    .call(d3.axisBottom(x).tickSizeOuter(0)).tickFormat(() => '')

  function transitionGrouped() {
    y.domain([ 0, yMax ]);

    rect.transition()
      .duration(500)
      .delay((d, i) => i * 20)
      .attr('x', (d, i) => x(i) + x.bandwidth() / n * d[ 2 ])
      .attr('width', x.bandwidth() / n)
      .transition()
      .attr('y', d => y(d[ 1 ] - d[ 9 ]))
      .attr('height', d => y(0) - y(d[ 1 ] - d[ 0 ]))
  }

  function transitionStacked() {
    y.domain([ 0, y1Max ])

    rect.transition()
      .duration(500)
      .delay((d, i) => i * 20)
      .attr('y', d => y(d[ 1 ]))
      .attr('width', x.bandwidth())
      .transition()
      .attr('x', (d, i) => x(i))
      .attr('width', x.bandwidth())

  }

  function update(layout) {
    layout === 'stacked' ? transitionStacked() : transitionGrouped()
  }

  return Object.assign(svg.node(), {
    update
  })
}

export default BarChartComponent;