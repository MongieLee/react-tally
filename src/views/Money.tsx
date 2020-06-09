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
type Category = 'pay' | 'income'
const Money = () => {
  const [selected, setSelected] = React.useState({
    tagIds: [] as number[],
    note: '',
    category: 'pay' as Category,
    amount: 0
  })
  const onChange = (obj: Partial<typeof selected>) => {
    setSelected({ ...selected, ...obj })
  }
  return (
    <MyLayout>
      <TagsSection
        selected={selected.tagIds}
        onChange={tagIds => onChange({ tagIds })}
      />
      <NotesSection
        note={selected.note}
        onChange={note => onChange({ note })}
      />
      <CategorySection
        category={selected.category}
        onChange={category => onChange({ category })}
      />
      <NumberPadSection
        amount={selected.amount}
        onChange={amount => onChange({ amount })}
      />
    </MyLayout>
  )
}

export default Money
