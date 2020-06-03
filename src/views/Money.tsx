import React from 'react'
import Layout from 'components/Layout'
import styled from 'styled-components'
import { TagsSection } from './Money/TagsSection'
import { NotesSection } from './Money/NotesSection'
import { CategorySection } from './Money/CategorySection'
import { NumberPadSection } from './Money/NumberPadSection'

const MyLayout = styled(Layout)`
  display: flex;
  flex-direction: column;
`

const Money = () => {
  return (
    <MyLayout>
      <TagsSection />
      <NotesSection /> 
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
