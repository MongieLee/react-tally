import React from 'react'
import Layout from 'components/Layout'
import styled from 'styled-components'
import { TagsSection } from './Money/TagsSection'
import { NotesSection } from './Money/NotesSection'
import { CategorySection } from './Money/CategorySection'
import { NumberPadSection } from './Money/NumberPadSection'
import { useHistory } from 'react-router-dom'
import { useRecord } from 'hooks/useRecord'
const MyLayout = styled(Layout)`
  display: flex;
  flex-direction: column;
`
type Category = 'pay' | 'income'
const defaultSelected = {
  tag: { name: '餐饮', tagType: '吃喝', iconName: 'food' },
  note: '',
  category: 'pay' as Category,
  amount: 0
}
const Money: React.FC = () => {
  const [selected, setSelected] = React.useState(defaultSelected)
  const { records, addRecord } = useRecord()
  const history = useHistory()
  const onChange = (obj: any) => {
    console.log(obj)
    let o = { ...selected }
    o.tag = obj
    setSelected({ ...o })
  }
  const amountChange = (amount: any) => {
    setSelected({ ...selected, amount })
  }

  const notesChange = (note: any) => {
    setSelected({ ...selected, note })
  }
  const categoryChange = (category: any) => {
    setSelected({ ...selected, category })
  }

  const tagChange = (tag: any) => {
    setSelected({ ...selected, tag })
  }
  const submit = () => {
    addRecord(selected)
    setTimeout(() => {
      history.push('/')
    }, 0)
  }
  return (
    <MyLayout>
      <CategorySection
        category={selected.category}
        onChange={category => categoryChange(category)}
      />
      <TagsSection selected={selected.tag} onChange={tag => tagChange(tag)} />
      <NotesSection note={selected.note} onChange={note => notesChange(note)} />

      <NumberPadSection
        amount={selected.amount}
        onOk={submit}
        onChange={amount => amountChange(amount)}
      />
    </MyLayout>
  )
}

export default Money
