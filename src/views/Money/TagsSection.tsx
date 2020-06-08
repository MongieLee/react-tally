import styled from 'styled-components'
import React, { useState } from 'react'
import {useTags} from 'useTags'
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
type Props = { selected: string[]; onChange: (tags: string[]) => void }
const TagsSection: React.FC<Props> = props => {
  const {tags,setTags} = useTags()
  const selectedTags = props.selected
  const addTag = () => {
    const tagName = window.prompt('新标签的名称为：')
    if (tagName !== null) {
      setTags([...tags, tagName])
    }
  }
  const onToggleTag = (tag: string) => {
    if (selectedTags.indexOf(tag) >= 0) {
      props.onChange(selectedTags.filter(t => t !== tag))
    } else {
      props.onChange([...selectedTags, tag])
    }
  }
  return (
    <Wrapper>
      <ul>
        {tags.map(tag => (
          <li
            key={tag}
            onClick={() => onToggleTag(tag)}
            className={selectedTags.indexOf(tag) >= 0 ? 'selected' : ''}
          >
            {tag}
          </li>
        ))}
      </ul>
      <button onClick={addTag}>新增标签</button>
    </Wrapper>
  )
}
export { TagsSection }
