import styled from 'styled-components'
import React from 'react'
const Wrapper = styled.section`
  padding: 0 16px;
  font-size: 14px;
  label {
    align-items: center;
    display: flex;
    span {
      white-space: nowrap;
      margin-right: 16px;
    }
    input {
      width: 100%;
      height: 72px;
      border: none;
      background: none;
    }
  }
`
type Props = { note: string; onChange: (note: string) => void }
const NotesSection: React.FC<Props> = props => {
  const note = props.note
  return (
    <Wrapper>
      <label>
        <span>备注</span>
        <input
          type='text'
          placeholder='请输入备注'
          value={note}
          onChange={e => props.onChange(e.target.value)}
        />
      </label>
    </Wrapper>
  )
}

export { NotesSection }
