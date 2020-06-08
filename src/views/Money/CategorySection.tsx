import styled from 'styled-components'
import React, { useState } from 'react'
const Wrapper = styled.section`
  background-color: #c4c4c4;
  font-size: 24px;
  ul {
    display: flex;
    text-align: center;
    li {
      position: relative;
      padding: 20px 0;
      width: 50%;
      &.selected::after {
        position: absolute;
        bottom: 0;
        left: 0;
        content: '';
        background: #333;
        display: block;
        height: 3px;
        width: 100%;
      }
    }
  }
`
const CategorySection: React.FC = () => {
  const [categoryList] = useState<('pay' | 'income')[]>(['pay', 'income'])
  const categoryMap = { pay: '支出', income: '收入' }
  const [category, setCategory] = useState('pay') //pay为支出,income为收入
  return (
    <Wrapper>
      <ul>
        {categoryList.map(t => {
          return (
            <li
              key={t}
              className={category === t ? 'selected' : ''}
              onClick={() => setCategory(t)}
            >
              {categoryMap[t]}
            </li>
          )
        })}
      </ul>
    </Wrapper>
  )
}
export { CategorySection }
