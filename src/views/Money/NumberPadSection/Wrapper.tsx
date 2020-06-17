import styled from 'styled-components'
const Wrapper = styled.section`
  .output {
    border-top: 1px #ddd solid;
    background: rgb(242, 243, 245);
    line-height: 1;
    font-size: 50px;
    text-align: right;
    padding: 5px 20px;
  }
  .numberPad {
    button {
      height: 64px;
      width: 25%;
      border: 1px #ddd solid;
      &:not(:last-child) {
        background: rgb(242, 243, 245);
      }
      &.zero {
        width: 50%;
      }
      &.ok {
        float: right;
        height: 128px;
      }
    }
  }
`
export { Wrapper }