import styled from 'styled-components'

const CategorySection = styled.section`
  background-color: #c4c4c4;
  font-size: 24px;
  ul {
    display: flex;
    text-align: center;
    li {
      position: relative;
      padding: 20px 0;
      width: 50%;
      &.selected::after {
        position: absolute;
        bottom: 0;
        left: 0;
        content: '';
        background: #333;
        display: block;
        height: 3px;
        width: 100%;
      }
    }
  }
`

export { CategorySection }
