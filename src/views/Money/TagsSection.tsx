import styled from 'styled-components'
import React, { useEffect, useState } from 'react'
import { useTags } from 'hooks/useTags'
import { createId } from 'lib/createId'
import Icon from 'components/Icon'
import { Link } from 'react-router-dom'
const Wrapper = styled.section`
  flex-grow: 1;
  padding: 12px 16px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
  ul {
    margin: 0 -12px;
    li {
      background-color: #d9d9d9;
      border-radius: 18px;
      display: inline-block;
      padding: 3px 18px;
      font-size: 14px;
      margin: 8px 12px;
      &.selected {
        background-color: red;
      }
    }
  }
  button {
    border: none;
    background-color: inherit;
    padding: 3px;
    border-bottom: 1px #333 solid;
    color: #666;
    margin-top: 9px;
  }
`

const Tags = styled.div`
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
`
type Props = {
  selected: number[]
  onChange: (selected: number[]) => void
}
const TagsSection: React.FC<Props> = props => {
  const [userTags, setUserTags] = useState([1, 2])
  
  console.log(userTags)
  const { tags, addTag } = useTags()
  const selectedTagIds = props.selected
  const clickAddButton = () => {
    addTag()
  }
  const onToggleTag = (tagId: number) => {
    if (selectedTagIds.indexOf(tagId) >= 0) {
      props.onChange(selectedTagIds.filter(t => t !== tagId))
    } else {
      props.onChange([...selectedTagIds, tagId])
    }
  }
  return (
    <Wrapper>
      <Tags>
        <ul className='currentTags'>
          <li>
            <Icon />
            <span></span>
          </li>
        </ul>
      </Tags>
      <ul>
        {tags.map(tag => (
          <li
            key={tag.id}
            onClick={() => onToggleTag(tag.id)}
            className={selectedTagIds.indexOf(tag.id) >= 0 ? 'selected' : ''}
          >
            {tag.name}
          </li>
        ))}
      </ul>
      <Link to='/labels'>
        <button
          onClick={() => {
            clickAddButton()
          }}
        >
          新增标签
        </button>
      </Link>
    </Wrapper>
  )
}
export { TagsSection }
