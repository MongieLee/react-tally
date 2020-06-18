import React from 'react'
import Layout from 'components/Layout'
import styled from 'styled-components'
import { TagsSection } from './Money/TagsSection'
import { NotesSection } from './Money/NotesSection'
import { CategorySection } from './Money/CategorySection'
import { NumberPadSection } from './Money/NumberPadSection'
import { useRecord } from 'hooks/useRecord'
const MyLayout = styled(Layout)`
  display: flex;
  flex-direction: column;
`
type Category = 'pay' | 'income'
const defaultSelected = {
  tagIds: [] as number[],
  note: '',
  category: 'pay' as Category,
  amount: 0
}
const Money = () => {
  const [selected, setSelected] = React.useState(defaultSelected)
  const { records, addRecord } = useRecord()
  const onChange = (obj: Partial<typeof selected>) => {
    setSelected({ ...selected, ...obj })
  }
  const submit = () => {
    addRecord(selected)
    alert('ok')
    setSelected(defaultSelected)
  }
  return (
    <MyLayout>
      <CategorySection
        category={selected.category}
        onChange={category => onChange({ category })}
      />
      <TagsSection
        selected={selected.tagIds}
        onChange={tagIds => onChange({ tagIds })}
      />
      <NotesSection
        note={selected.note}
        onChange={note => onChange({ note })}
      />

      <NumberPadSection
        amount={selected.amount}
        onOk={submit}
        onChange={amount => onChange({ amount })}
      />
    </MyLayout>
  )
}

export default Money
