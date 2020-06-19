import styled from 'styled-components'
import React from 'react'
const Wrapper = styled.section`
  padding: 3px 10px 3px 15px;
  display: flex;
  align-items: center;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.25);
  label {
    align-items: center;
    display: flex;
    span {
      white-space: nowrap;
      margin-right: 16px;
    }
    input {
      margin-left: 10px;
      flex-grow: 1;
      border: none;
      padding: 5px 3px;
      background: transparent;
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
