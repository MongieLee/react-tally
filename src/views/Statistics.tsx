import React, { useState } from 'react'
import Layout from 'components/Layout'
import styled from 'styled-components'
import { useRecord, RecordItem } from 'hooks/useRecord'
import day from 'dayjs'
import 'antd/dist/antd.css'
import { DatePicker } from 'antd';
// import zhCN from 'antd/es/date-picker/locale/zh_CN'; // 引入中文包
import 'moment/locale/zh-cn';
import moment from 'moment';
import zhCN from 'antd/lib/date-picker/locale/zh_CN';
import Icon from '../components/Icon'
import { useTags } from 'hooks/useTags'
const TextTitle = styled.div`
  background-color: rgb(255, 218, 71);
  text-align: center;
  padding: 12px 0 0;
  font-size: 20px;
`
console.log(zhCN)

const TimeAndCount = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgb(255, 218, 71);
  span {
    margin-right: 13px;
  }
`
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
    height: 100%;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    color: #999;
    .icon {
      width: 80px;
      height: 80px;
    }
    span {
      font-size: 14px;
    }
    > div.no-data{
      height:100%;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
    }
`

const Statistics = () => {
  const [category, setCategory] = useState('pay')
  const { records } = useRecord()
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
  const getRecordsList = () => {
    if (array.length === 0) {
      return (
        <div className='no-data'>
          <Icon name="no-data" />
          <span>暂无数据,快去记一笔吧~</span>
        </div>
      )
    } else {
      return (
        <div>
          {array.map(([date, records]) => {
            return (
              <div key={date}>
                {date}
                <ul>
                  
                </ul>
              </div>
            )
          })}
        </div>
      )
    }
  }

  return (
    <Layout>
      <TextTitle>
        <span>轻记账</span>
      </TextTitle>
      <TimeAndCount>
        <DatePicker defaultValue={moment('2020/06', 'YYYY/MM')} format='YYYY/MM' locale={zhCN} picker="month"></DatePicker>
        <div>
          <span>收入：0.00</span>
          <span>支出：0.00</span>
        </div>
      </TimeAndCount>

      <RecordsWrapper>
        {getRecordsList()}
      </RecordsWrapper>
    </Layout>
  )
}

export default Statistics
