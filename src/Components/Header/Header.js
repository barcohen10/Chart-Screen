import React, { useState } from 'react';
import styled from 'styled-components';
import { Menu, Segment, Input, Icon } from "semantic-ui-react";
import LogoAsset from '../../assets/logo.png'
import { POPULATION_ISRAEL_API, STOCK_VOLUME_API } from '../../Constants/apis'

const Header = (props) => {
  const { filters, setFilters } = props
  const setCurrentApi = (api) => {
    if (filters.currentAPI.TITLE !== api.TITLE) {
      setFilters({ ...filters, currentAPI: api })
    }
  }

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
          <Input iconPosition='left' placeholder='Number of data points'>
            <Icon name='chart line' />
            <input />
          </Input>
        </Menu.Item>
        <Menu.Item>
          <Input iconPosition='left' placeholder='Threshold'>
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