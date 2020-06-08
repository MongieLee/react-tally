import styled from 'styled-components'
const Wrapper = styled.section`
  .output {
    background: #fff;
    line-height: 72px;
    font-size: 36px;
    text-align: right;
    padding: 0 16px;
    box-shadow: inset 0 -5px 5px -5px rgba(0, 0, 0, 0.25),
      inset 0 5px 5px -5px rgba(0, 0, 0, 0.25);
  }
  .numberPad {
    button {
      font-size: 18px;
      float: left;
      width: 25%;
      height: 64px;
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
export {Wrapper}