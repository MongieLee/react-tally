import styled from 'styled-components'
import React from 'react'
import { Link } from 'react-router-dom'
import Icon from './Icon'

const NavWrapper = styled.ul`
  display: flex;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.25);
  li {
    width: 33.3333%;
    padding:4px 0;
    a {
      display: flex;
      flex-direction: column;
      justify-content:center;
      align-items:center;
      .icon{
          width:24px;
          height:24px;
      }
    }
  }
`
const Nav = () => {
  return (
    <NavWrapper>
      <li>
        <Link to='/'>
          <Icon name='detailed'/>
          明细
        </Link>
      </li>
      <li>
        <Link to='/statistics'>
          <Icon name='money'/>
          记账
        </Link>
      </li>
      <li>
        <Link to='/reportForm'>
          <Icon name='reportForm'/>
          报表
        </Link>
      </li>
    </NavWrapper>
  )
}

export default Nav
