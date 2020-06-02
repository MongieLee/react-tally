import styled from 'styled-components'
const TagsSection = styled.section`
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
export { TagsSection }
