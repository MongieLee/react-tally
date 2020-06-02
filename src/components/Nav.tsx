import styled from 'styled-components'
import React from 'react'
import { Link } from 'react-router-dom'
import x from 'icons/detailed.svg'
import z from 'icons/money.svg'
import c from 'icons/reportForm.svg'
console.log(x, z, c)
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
          <svg className='icon'>
            <use xlinkHref={'#detailed'} />
          </svg>
          明细
        </Link>
      </li>
      <li>
        <Link to='/statistics'>
          <svg className='icon'>
            <use xlinkHref={'#money'} />
          </svg>
          记账
        </Link>
      </li>
      <li>
        <Link to='/reportForm'>
          <svg className='icon'>
            <use xlinkHref={'#reportForm'} />
          </svg>
          报表
        </Link>
      </li>
    </NavWrapper>
  )
}

export default Nav
