import React, { useState } from 'react'
import Layout from 'components/Layout'
import styled from 'styled-components'
import { useRecord, RecordItem } from 'hooks/useRecord'
import day from 'dayjs'
import { useTags } from 'hooks/useTags'
const CategorySection = styled.ul`
  display: flex;
  text-align: center;
  background-color: yellow;
  li {
    border: 1px red solid;
    width: 50%;
    padding: 20px;
    &.selected {
      background-color: white;
    }
  }
`

const RecordsWrapper = styled.div`
  margin-top: 20px;
  background-color: white;
  ul {
    li {
      display: flex;
      justify-content: space-between;
      .note {
        margin-right: auto;
        margin-left: 16px;
      }
    }
  }
`

const Statistics = () => {
  const [category, setCategory] = useState('pay')
  const { records } = useRecord()
  const { getName } = useTags()
  const hash: { [key: string]: RecordItem[] } = {}
  const selectedRecords = records.filter(record => record.category === category)
  selectedRecords.map(item => {
    const key = day(item.createdAt).format('YYYY-MM-DD')
    const value = item
    if (!(key in hash)) hash[key] = []
    hash[key].push(value)
  })
  const array = Object.entries(hash).sort((a, b) => {
    //   a[0]===b[0]&&( return 0)
    //   a[0]>b[0]&&(return -1)
    //   a[0]<b[0]&& (return 1)
    if (a[0] === b[0]) return 0
    if (a[0] > b[0]) return -1
    if (a[0] < b[0]) return 1
    return 0
  })
  const onClick = (type: string) => {
    setCategory(type)
  }
  console.log(array)
  return (
    <Layout>
      <CategorySection>
        <li
          onClick={() => {
            onClick('pay')
          }}
          className={category === 'pay' ? 'selected' : ''}
        >
          支出
        </li>
        <li
          onClick={() => {
            onClick('income')
          }}
          className={category === 'income' ? 'selected' : ''}
        >
          收入
        </li>
      </CategorySection>
      <RecordsWrapper>
        <div>
          {array.map(([date, records]) => {
            return (
              <div key={date}>
                {date}
                <ul>
                  {records.map(r => {
                    return (
                      <li key={r.createdAt}>
                        {r.tagIds.map(tagId => (
                          <span key={r.createdAt}>{getName(tagId)}</span>
                        ))}
                        {r.note && <div className='note'>{r.note}</div>}

                        <div>￥ {r.amount}</div>
                      </li>
                    )
                  })}
                </ul>
              </div>
            )
          })}
        </div>
      </RecordsWrapper>
    </Layout>
  )
}

export default Statistics
