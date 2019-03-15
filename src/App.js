import React, { useState, Fragment } from 'react'
import Header from './Components/Header/Header'
import Chart from './Components/Chart/Chart'
import { POPULATION_ISRAEL_API as DEFAULT_API } from './Constants/apis'
import { Modal, Message } from "semantic-ui-react";


const App = () => {
  const [filters, setFilters] = useState({
    currentAPI: DEFAULT_API,
    numOfDataPoints: 10,
    threshold: ''
  });
  const [error, setError] = useState('');
  const headerProps = { filters, setFilters, setError }
  const chartProps = { filters, setError }

  return (
    <Fragment>
      <Header {...headerProps} />
      <Chart {...chartProps} />
      <Modal size='tiny' open={!!error} onClose={() => setError('')} closeIcon>
        <Modal.Header>Error</Modal.Header>
        <Modal.Content>
          <Message negative>
            <Message.Header>{ error }</Message.Header>
          </Message>
        </Modal.Content>
      </Modal>
    </Fragment>
  )
}

export default App;
