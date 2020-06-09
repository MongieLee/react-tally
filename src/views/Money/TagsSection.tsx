import styled from 'styled-components'
import React from 'react'
import { useTags } from 'useTags'
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
type Props = {
  selected: number[]
  onChange: (selected: number[]) => void
}
const TagsSection: React.FC<Props> = props => {
  const { tags, setTags } = useTags()
  const selectedTagIds = props.selected
  const addTag = () => {
    const tagName = window.prompt('新标签的名称为：')
    if (tagName !== null) {
      setTags([...tags, { id: Math.random(), name: tagName }])
    }
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
      <button onClick={addTag}>新增标签</button>
    </Wrapper>
  )
}
export { TagsSection }
