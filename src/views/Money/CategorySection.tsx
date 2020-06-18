import styled from 'styled-components'
import React, { useState } from 'react'
import Icon from 'components/Icon'
import { useHistory } from 'react-router-dom'

const Wrapper = styled.section`
  position: relative;
  background-color: rgb(255, 218, 71);
  .icon {
    font-size: 5px;
    position: absolute;
    left: 40px;
    top: 20px;
    width: 22px;
    height: 22px;
  }
  .type-list {
    margin-bottom: 0;
    display: flex;
    justify-content: center;
    li {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 20px 10px 10px;
      position: relative;
      &.selected::after {
        content: '';
        display: block;
        width: 100%;
        border: 2px black solid;
        border-radius: 5px;
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
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
  const history = useHistory()
  const goBack = () => {
    history.goBack()
  }
  return (
    <Wrapper>
      <ul className='type-list'>
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
      <span>
        <Icon name='close' onClick={()=>{goBack()}}/>
      </span>
    </Wrapper>
  )
}

export { CategorySection }
