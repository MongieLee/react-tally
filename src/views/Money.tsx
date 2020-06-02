import React from 'react'
import Layout from 'components/Layout'
import styled from 'styled-components'

const TagsSection = styled.section`
  flex-grow: 1;
  padding: 12px 16px;
  background-color: #fff;
  display:flex;
  flex-direction:column;
  justify-content:flex-end;
  align-items:flex-start;
  ul {
    /* display: flex;
    flex-wrap: wrap; */
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

const NumberPadSection = styled.section`
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

const MyLayout = styled(Layout)`
  display: flex;
  flex-direction: column;
`

const Money = () => {
  return (
    <MyLayout>
      <TagsSection>
        <ul>
          <li>衣</li>
          <li>食</li>
          <li>住</li>
          <li>行</li>
          <li>行</li>
          <li>行</li>
          <li>行</li>
          <li>行</li>
          <li>行</li>
          <li>行</li>
        </ul>
        <button>新增标签</button>
      </TagsSection>

      <NotesSection>
        <label>
          <span>备注</span>
          <input type='text' placeholder='请输入备注' />
        </label>
      </NotesSection>

      <CategorySection>
        <ul>
          <li className='selected'>支出</li>
          <li>收入</li>
        </ul>
      </CategorySection>

      <NumberPadSection>
        <div className='output'>100</div>
        <div className='numberPad clearfix'>
          <button>1</button>
          <button>2</button>
          <button>3</button>
          <button>Del</button>
          <button>4</button>
          <button>5</button>
          <button>6</button>
          <button>C</button>
          <button>7</button>
          <button>8</button>
          <button>9</button>
          <button className='ok'>OK</button>
          <button className='zero'>0</button>
          <button>.</button>
        </div>
      </NumberPadSection>
    </MyLayout>
  )
}

export default Money
