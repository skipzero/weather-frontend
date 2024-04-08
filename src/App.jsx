import React, { createRef, useEffect, RefObject, useState } from 'react';
import * as d3 from 'd3';
import './App.scss';
import barChartComponent from './components/stackedBarChart';




const App = () => {
  const [ data, setData ] = useState()
  const url = 'https://zerosquadron.com'

  const ref = createRef();

  return (
    <>
      <BarChartComponent data={ data } />
    </>
  )

}


export default App;




