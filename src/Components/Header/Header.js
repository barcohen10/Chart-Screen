import React, { useState } from 'react';
import styled from 'styled-components';
import { Menu, Segment } from "semantic-ui-react";
import LogoAsset from '../../assets/logo.png'

const Header = () => {
  const AGE_OF_EMPLOYEES = 'Age Of Employees';
  const BLA_BLA = 'Bla Bla'
  const [currentApi, setCurrentApi] = useState(AGE_OF_EMPLOYEES);

  return (
    <Segment inverted>
      <Menu inverted secondary pointing>
        <Menu.Item>
          <Image src={LogoAsset} />
        </Menu.Item>
        <Menu.Item name={AGE_OF_EMPLOYEES} active={currentApi === AGE_OF_EMPLOYEES} onClick={() => setCurrentApi(AGE_OF_EMPLOYEES)} />
        <Menu.Item name={BLA_BLA} active={currentApi === BLA_BLA} onClick={() => setCurrentApi(BLA_BLA)} />
      </Menu>
    </Segment>
  )
}

export default Header

const Image = styled.img`
  width: 150px !important;
  margin-right: 20px !important;
`