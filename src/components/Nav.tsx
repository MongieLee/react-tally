import styled from 'styled-components'
import React from 'react'
import { NavLink } from 'react-router-dom'
import Icon from './Icon'

const NavWrapper = styled.ul`
  background: #fff;
  display: flex;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.25);
  margin-bottom: 0;
  li {
    width: 33.3333%;
    padding: 4px 0;
    a {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .icon {
        width: 24px;
        height: 24px;
      }
      &.selected .icon{
        color: rgb(255, 218, 71);;
      }
    }
  }
`
const Nav = () => {
  return (
    <NavWrapper>
      <li>
        <NavLink to='/statistics' activeClassName='selected'>
          <Icon name='detailed' />
          明细
        </NavLink>
      </li>
      <li>
        <NavLink to='/money' activeClassName='selected'>
          <Icon name='money' />
          记账
        </NavLink>
      </li>
      <li>
        <NavLink to='/reportForm' activeClassName='selected'>
          <Icon name='reportForm' />
          报表
        </NavLink>
      </li>
    </NavWrapper>
  )
}

export default Nav
