import { useState } from 'react'
import './App.scss';
import BarChartComponent from './components/stackedBarChart';

const App = () => {
  // const [ data, setData ] = useState([ 22, 56, 25, 57, 98, 32, 25, 12, 16, 76 ])

  return (
    <>
      <div>
        <BarChartComponent />
      </div>
      {/* <button onClick={ () => setData([ 23, 67, 86, 21, 77, 32, 11, 87, 45, 21 ]) } >Change Data</button >
      <button onClick={ () => setData(data.filter(item => item < 34)) } >Change Data</button > */}
    </>
  )

}


export default App;




