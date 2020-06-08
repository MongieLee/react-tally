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
type Props = {
  category: 'pay' | 'income'
  onChange: (category: 'pay' | 'income') => void
}
const CategorySection: React.FC<Props> = props => {
  const [categoryList] = useState<('pay' | 'income')[]>(['pay', 'income'])
  const categoryMap = { pay: '支出', income: '收入' }
  const category = props.category
  return (
    <Wrapper>
      <ul>
        {categoryList.map(t => {
          return (
            <li
              key={t}
              className={category === t ? 'selected' : ''}
              onClick={() => props.onChange(t)}
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
