import React from 'react';
import styled from 'styled-components';
import { Menu, Segment, Input, Icon } from "semantic-ui-react";
import LogoAsset from '../../assets/logo.png'
import { POPULATION_ISRAEL_API, STOCK_VOLUME_API } from '../../Constants/apis'
import { NUM_OF_DATA_POINTS, THRESHOLD } from '../../Constants/placeholders'
import { debounce } from 'lodash'

const Header = (props) => {
  const { filters, setFilters } = props
  const setCurrentApi = (api) => {
    if (filters.currentAPI.TITLE !== api.TITLE) {
      setFilters({ ...filters, currentAPI: api })
    }
  }

  const setNumberOfDataPoints = debounce(numOfDataPoints => {
    if (filters.numOfDataPoints !== numOfDataPoints
      && !isNaN(numOfDataPoints)
      && numOfDataPoints > 1) {
      setFilters({ ...filters, numOfDataPoints })
    }
  }, 500)


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
          <Input iconPosition='left'
            placeholder={NUM_OF_DATA_POINTS}
            onChange={(e) => setNumberOfDataPoints(e.target.value)}>
            <Icon name='chart line' />
            <input />
          </Input>
        </Menu.Item>
        <Menu.Item>
          <Input iconPosition='left' placeholder={THRESHOLD}>
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