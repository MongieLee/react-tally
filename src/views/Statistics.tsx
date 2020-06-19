import React, { useState } from 'react'
import Layout from 'components/Layout'
import styled from 'styled-components'
import { useRecord, RecordItem } from 'hooks/useRecord'
import dayJs from 'dayjs'
import 'antd/dist/antd.css'
import { DatePicker } from 'antd'
// import zhCN from 'antd/es/date-picker/locale/zh_CN'; // 引入中文包
import 'moment/locale/zh-cn'
import moment from 'moment'
import zhCN from 'antd/lib/date-picker/locale/zh_CN'
import Icon from '../components/Icon'
import { useTags } from 'hooks/useTags'
const TextTitle = styled.div`
  background-color: rgb(255, 218, 71);
  text-align: center;
  padding: 12px 0 0;
  font-size: 20px;
`

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
  > div.no-data {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
`

const ListItem = styled.div`
   {
    color: black;
    padding: 5px 8px;
    display: flex;
    align-items: center;
    border-bottom: 1px #f5f5f5 solid;
    position: relative;
    .icon {
      height: 40px;
      width: 40px;
      color: rgb(255, 218, 71);
      border-radius: 50%;
      background-color: #f5f5f5;
      padding: 10px;
    }
    .tag-type {
      margin-left: 20px;
    }
    .amount {
      position: absolute;
      right: 15px;
      top: 50%;
      transform: translateY(-50%);
    }
  }
`
const DayInfo = styled.div`
 padding: 3px 15px 3px 10px;
        border-bottom: 1px #f5f5f5 solid;
        font-size: 14px;
        color: #999;
        display: flex;
        justify-content: space-between;
      }
      span:nth-child(1) {
        margin-right: 5px;
      }
`
let currentPay: number = 0
let currentIncome: number = 0
const ddd = (recordList: any) => {
  if (recordList.length === 0) {
    return recordList
  }
  let currentM = new Date()
  let currentMonthList = JSON.parse(JSON.stringify(recordList)).filter(
    (item: any) => {
      if (dayJs(item.createdAt).get('month') === dayJs(currentM).get('month')) {
        return item
      }
    }
  )
  let xxx = [] as any[]
  currentMonthList.map((v: any) => {
    let day = dayJs(v.createdAt).get('date')!
    if (!xxx[day]) {
      xxx[day] = []
      xxx[day].push(v)
    } else {
      xxx[day].push(v)
    }
  })
  xxx.map(w => {
    w.sort(
      (a: any, b: any) =>
        dayJs(b.createdAt).valueOf() - dayJs(a.createdAt).valueOf()
      //  dayJs(a.createTime).valueOf() - dayJs(b.createTime).valueOf()
    )
    w.map((k: any) => {
      if (k.category === 'pay') {
        currentPay += parseFloat(k.amount)
      } else if (k.category === 'income') {
        currentIncome += parseFloat(k.amount)
      }
    })
  })
  console.log(currentPay)
  console.log(currentIncome)
  localStorage.setItem('paihaoxude', JSON.stringify(xxx))
  let paixuhoude = xxx
  return { paixuhoude, currentPay, currentIncome }
}

const getDate = () => {}
const getPay = (arr: any[]) => {
  let glod: number = 0
  arr.map((item: any) => {
    if (item.category === 'pay') {
      glod += item.amount
    }
  })
  return glod.toFixed(2)
}
const getIncome = (arr: any[]) => {
  let glod: number = 0
  arr.map((item: any) => {
    if (item.category !== 'pay') {
      glod += item.amount
    }
  })
  return glod.toFixed(2)
}

const Hahaha = styled.div`
  width: 120px;
`
const DateWrapper = styled.div`
  display: flex;
  flex-direction: column-reverse;
`
const Statistics = () => {
  const { records } = useRecord()
  const { paixuhoude, currentPay, currentIncome } = ddd(records)
  console.log(paixuhoude, currentPay, currentIncome)
  console.log(typeof paixuhoude)
  const hash: any = {}
  records.map(item => {
    const key = dayJs(item.createdAt).format('YYYY-MM-DD')
    const value = item
    if (!(key in hash)) hash[key] = []
    hash[key].push(value)
  })
  if (paixuhoude) {
    paixuhoude.map((i: any, index: any) => console.log(index, i))
  }
  const array = Object.entries(hash).sort((a, b) => {
    //   a[0]===b[0]&&( return 0)
    //   a[0]>b[0]&&(return -1)
    //   a[0]<b[0]&& (return 1)
    if (a[0] === b[0]) return 0
    if (a[0] > b[0]) return -1
    if (a[0] < b[0]) return 1
    return 0
  })

  const getMonth = () => {
    let currentM = new Date()
    return dayJs(currentM).get('month')
  }
  const getDate = function (index: any) {
    let objMap: any = {
      '1': '一',
      '2': '二',
      '3': '三',
      '4': '四',
      '5': '五',
      '6': '六',
      '7': '七'
    }
    if (!paixuhoude[index]) {
      return
    } else {
      console.log(paixuhoude[index][0].createdAt, '---')
      console.log('星期几', dayJs(paixuhoude[index][0].createdAt).get('day'))
      return `${getMonth() + 1}月${index}号 星期${
        objMap[dayJs(paixuhoude[index][0].createdAt).get('day')]
      }`
    }
  }
  console.log(array)
  const getRecordsList = () => {
    if (array.length === 0) {
      return (
        <div className='no-data'>
          <Icon name='no-data' />
          <span>暂无数据,快去记一笔吧~</span>
        </div>
      )
    } else {
      return (
        <DateWrapper>
          {paixuhoude.map((value: any, index: any) => {
            console.log(value, index)
            return (
              <div key={index}>
                <DayInfo>
                  <span>{getDate(index)}</span>
                  <span>
                    <span>{`收入：${getIncome(value)}`}</span>
                    <span>{`支出: ${getPay(value)}`}</span>
                  </span>
                </DayInfo>
                <ul>
                  {value.map((www: any) => {
                    return (
                      <ListItem key={www.createdAt}>
                        <Icon name={www.tag.iconName} />
                        <span className='tag-type'>{www.tag.name}</span>
                        <span className='amount'>{`${
                          www.category === 'pay' ? '- ' : '+ '
                        }${www.amount.toFixed(2)}`}</span>
                      </ListItem>
                    )
                  })}
                </ul>
              </div>
            )
          })}
        </DateWrapper>
      )
    }
  }

  return (
    <Layout>
      <TextTitle>
        <span>轻记账</span>
      </TextTitle>
      <TimeAndCount>
        <Hahaha>
          <DatePicker
            defaultValue={moment('2020/06', 'YYYY/MM')}
            format='YYYY/MM'
            locale={zhCN}
            picker='month'
          ></DatePicker>
        </Hahaha>
        <div>
          <span>{`收入：${currentPay && currentPay.toFixed(2)}`}</span>
          <span>{`支出: ${currentIncome && currentIncome.toFixed(2)}`}</span>
        </div>
      </TimeAndCount>

      <RecordsWrapper>{getRecordsList()}</RecordsWrapper>
    </Layout>
  )
}

export default Statistics
