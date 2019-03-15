import React, { useState } from 'react';
import Header from './Components/Header/Header'
import Chart from './Components/Chart/Chart'
import { POPULATION_ISRAEL_API as DEFAULT_API } from './Constants/apis';

const App = () => {
  const [filters, setFilters] = useState({
    currentAPI: DEFAULT_API,
    numOfDataPoints: 5,
    threshold: ''
  });

  return (<div>
    <Header filters={filters} setFilters={setFilters} />
    <Chart filters={filters} />
  </div>)
}

export default App;
