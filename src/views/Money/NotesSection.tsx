import styled from 'styled-components'

const NotesSection = styled.section`
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

export { NotesSection }
