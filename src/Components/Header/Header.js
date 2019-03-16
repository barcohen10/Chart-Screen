import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Menu, Segment, Input, Icon } from "semantic-ui-react";
import LogoAsset from '../../assets/logo.png'
import { POPULATION_ISRAEL_API, STOCK_VOLUME_API } from '../../Constants/apis'
import { NUM_OF_DATA_POINTS, THRESHOLD } from '../../Constants/common'
import useDebounce from '../../Hooks/useDebounce'

const Header = (props) => {
  const { filters, setFilters, setError } = props

  const [dataPoints, setDataPoints] = useState('');
  const debouncedDataPoints = useDebounce(dataPoints, 500);

  const [threshold, setThreshold] = useState('');
  const debouncedThreshold = useDebounce(threshold, 500);

  const setCurrentApi = (api) => {
    try {
      if (filters.currentAPI.TITLE !== api.TITLE) {
        setFilters({ numOfDataPoints: 10, threshold: '', currentAPI: api })

        //clear inputs data
        setDataPoints('')
        setThreshold('')
      }
    }
    catch (e) {
      setError('Setting current API failed')
    }
  }

  useEffect(
    () => {
      try {
        if ((filters.numOfDataPoints !== debouncedDataPoints
          && !isNaN(debouncedDataPoints)
          && debouncedDataPoints > 1)) {
          setFilters({ ...filters, numOfDataPoints: debouncedDataPoints })
        } else if (debouncedDataPoints) {
          setError('Please check your input')
          setFilters({ ...filters, numOfDataPoints: 10 })
        }
      }
      catch (e) {
        setError('Setting number of data points failed')
      }
    },
    [debouncedDataPoints]
  );

  useEffect(
    () => {
      try {
        if ((filters.threshold !== debouncedThreshold
          && !isNaN(debouncedThreshold))) {
          setFilters({ ...filters, threshold: debouncedThreshold })
        } else if (debouncedThreshold) {
          setError('Please check your input')
        }
      }
      catch (e) {
        setError('Setting threshold failed')
      }
    },
    [debouncedThreshold]
  );

  return (
    <Segment>
      <Menu secondary pointing>
        <Menu.Item>
          <Image src={LogoAsset} />
        </Menu.Item>
        <Menu.Item
          name={POPULATION_ISRAEL_API.TITLE}
          active={filters.currentAPI.TITLE === POPULATION_ISRAEL_API.TITLE}
          onClick={() => setCurrentApi(POPULATION_ISRAEL_API)} />
        <Menu.Item
          name={STOCK_VOLUME_API.TITLE}
          active={filters.currentAPI.TITLE === STOCK_VOLUME_API.TITLE}
          onClick={() => setCurrentApi(STOCK_VOLUME_API)} />
        <Menu.Item>
          <Input
            iconPosition='left'
            value={dataPoints}
            placeholder={NUM_OF_DATA_POINTS}
            onChange={(e) => setDataPoints(e.target.value)}>
            <Icon name='chart line' />
            <input />
          </Input>
        </Menu.Item>
        <Menu.Item>
          <Input iconPosition='left'
            placeholder={THRESHOLD}
            value={threshold}
            onChange={(e) => setThreshold(e.target.value)}>
            <Icon name='minus' />
            <input />
          </Input>
        </Menu.Item>
      </Menu>
    </Segment>
  )
}

export default Header

const Image = styled.img`
  margin-right: 20px !important;
`