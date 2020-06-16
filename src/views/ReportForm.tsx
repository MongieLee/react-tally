import React, { useState } from 'react'
import Layout from 'components/Layout'
import { useTags } from 'hooks/useTags'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import Icon from 'components/Icon'
import { Button } from 'components/Button'

const TopBar = styled.div`
  background-color: rgb(255, 218, 71);
  padding: 11px 0;
  .type {
    text-align: center;
    margin-bottom: 10px;
    span {
      border: 1px #333 solid;
      padding: 5px;
      &.active {
        background-color: #333;
        color: rgb(255, 218, 71);
      }
    }
  }
  .company-date {
    display: flex;
    margin: 0 20px;
    text-align: center;
    li {
      width: 33.3333%;
      border: 1px #333 solid;
      &.active {
        background-color: #333;
        color: rgb(255, 218, 71);
      }
    }
  }
`
const getTimeText = (companyDate:any) => {
  let timeMap: any = {
    week: '本周',
    month: '本月',
    year: '今年'
  }
  return timeMap[companyDate]
}
const ClassWrapper = styled.div`
  font-size: 14px;
  padding: 10px 0 3px 35px;
  div {
    color: #999;
  }
`

const ReportForm = () => {
  const [category, setCategory] = useState('pay')
  const [companyDate, setCompanyDate] = useState('month')
  return (
    <Layout>
      <TopBar>
        <div className='type'>
          <span
            onClick={() => {
              setCategory('pay')
            }}
            className={category === 'pay' ? 'active' : ''}
          >
            支出
          </span>
          <span
            onClick={() => {
              setCategory('income')
            }}
            className={category === 'income' ? 'active' : ''}
          >
            收入
          </span>
        </div>

        <ul className='company-date'>
          <li
            onClick={() => {
              setCompanyDate('week')
            }}
            className={companyDate === 'week' ? 'active' : ''}
          >
            周
          </li>
          <li
            onClick={() => {
              setCompanyDate('month')
            }}
            className={companyDate === 'month' ? 'active' : ''}
          >
            月
          </li>
          <li
            onClick={() => {
              setCompanyDate('year')
            }}
            className={companyDate === 'year' ? 'active' : ''}
          >
            年
          </li>
        </ul>
      </TopBar>

      <ClassWrapper>
        {getTimeText(companyDate)}
        <div>{category==='pay'?'总支出':'总收入'}</div>
        <div>{category==='pay'?'平均支出':'平均收入'}</div>
      </ClassWrapper>
      <div id='lineChart'></div>
      <div id='pieChart' className='aaa'></div>
    </Layout>
  )
}

export default ReportForm
