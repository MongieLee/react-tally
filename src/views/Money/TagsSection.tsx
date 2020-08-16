import styled from 'styled-components'
import React, { useState } from 'react'
import { useTags } from 'hooks/useTags'
import Icon from 'components/Icon'
import { Link } from 'react-router-dom'
const Wrapper = styled.section`
  flex-grow: 1;
`

const Tags = styled.div`
  .currentTags {
    margin-top: 10px;
    display: flex;
    flex-wrap: wrap;
    li {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 25%;
      padding: 8px;
      span {
        font-size: 12px;
        margin-top: 5px;
      }
      .icon {
        border-radius: 50%;
        height: 40px;
        width: 40px;
        padding: 10px;
      }
      &.highlight {
        .icon {
          background: rgb(255, 218, 71);
        }
      }
    }
  }
  .add-wrapper {
    width: 25%;
    a {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 8px;
      span {
        font-size: 12px;
        margin-top: 5px;
      }
      .icon {
        border-radius: 50%;
        height: 40px;
        width: 40px;
        padding: 10px;
      }
      &.highlight {
        .icon {
          background: rgb(255, 218, 71);
        }
      }
    }
  }
`
type Props = {
  selected: any
  onChange: (selected: any) => void
}
const TagsSection: React.FC<Props> = props => {
  let [c, setC] = useState({ name: '餐饮', tagType: '吃喝', iconName: 'food' })
  useTags()
  const tags = JSON.parse(localStorage.getItem('userTags') || '[]')!
  const lll = (item:any) => {
    setC({ ...item })
    props.onChange(item)
  }
  return (
    <Wrapper>
      <Tags>
        <ul className='currentTags'>
          {tags.map((item: any) => {
            return (
              <li
                onClick={() => {
                  lll(item)
                }}
                className={c.name === item.name ? 'highlight' : ''}
                key={item.name}
              >
                <Icon name={item.iconName} />
                <span>{item.name}</span>
              </li>
            )
          })}
          <div className='add-wrapper'>
            <Link to='/labels'>
              <Icon name='add' />
              <span>添加</span>
            </Link>
          </div>
        </ul>
      </Tags>
    </Wrapper>
  )
}
export { TagsSection }
