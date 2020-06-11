import React, { useState } from 'react'
import Layout from 'components/Layout'
import styled from 'styled-components'
import { useRecord } from 'hooks/useRecord'
import day from 'dayjs'
const CategorySection = styled.ul`
  display: flex;
  text-align: center;
  background-color: yellow;
  li {
    border: 1px red solid;
    width: 50%;
    padding: 20px;
    &.selected {
      background-color: white;
    }
  }
`

const Statistics = () => {
  const [category, setCategory] = useState('pay')
  const { records } = useRecord()
  console.log(records)
  const onClick = (type: string) => {
    setCategory(type)
  }
  return (
    <Layout>
      <CategorySection>
        <li
          onClick={() => {
            onClick('pay')
          }}
          className={category === 'pay' ? 'selected' : ''}
        >
          支出
        </li>
        <li
          onClick={() => {
            onClick('income')
          }}
          className={category === 'income' ? 'selected' : ''}
        >
          收入
        </li>
      </CategorySection>
      <ul>
        {records.map(r => {
          return <li key={r.createdAt}>{r.amount}{day(r.createdAt).format('YYYY年MM月DD日')}</li>
        })}
      </ul>
    </Layout>
  )
}

export default Statistics
