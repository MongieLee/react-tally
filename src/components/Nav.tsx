import styled from 'styled-components'
import React from 'react'
import {Link} from 'react-router-dom'
import x from 'icons/money.svg'
console.log(x)
const NavWrapper = styled.ul`
  display: flex;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.25);
  li {
    text-align: center;
    padding: 16px;
    width: 33.3333%;
  }
`
const Nav = () => {
  return (
    <NavWrapper>
      <li>
        <Link to='/'>
        
        记账
        </Link>
      </li>
      <li>
        <Link to='/statistics'>明细</Link>
      </li>
      <li>
        <Link to='/reportForm'>报表</Link>
      </li>
    </NavWrapper>
  )
}

export default Nav
