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
import { useHistory } from 'react-router-dom'

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
let currentPay: number = 0 //当前月份总支出
let currentIncome: number = 0 //当前月份总收入
const ddd = (recordList: any, currentM: any) => {
  currentPay = 0
  currentIncome = 0
  //遍历所有账单
  if (recordList.length === 0) {
    //账单为空就返回
    console.log('999999999999999999')
    return recordList
  }
  //   let currentM = new Date() //获取当前时间
  let currentMonthList = JSON.parse(JSON.stringify(recordList)).filter(
    //遍历所有账单筛选出当前月份的时间
    (item: any) => {
      if (dayJs(item.createdAt).get('month') === dayJs(currentM).get('month')) {
        //如果账单的月份等于当前月份则加进数组中
        return item
      }
    }
  )
  let xxx = [] as any[] //声明一个空数组
  currentMonthList.map((v: any) => {
    //遍历当前月账单数组
    let day = dayJs(v.createdAt).get('date')! //获取每一笔账单为几号
    if (!xxx[day]) {
      //如果xxx数组中没有这个号
      xxx[day] = [] //赋值下标为号，值为空数组
      xxx[day].push(v) //将这条账单加入数组中
    } else {
      xxx[day].push(v)
    }
  })
  xxx.map(w => {
    //遍历分好每一天账单的数组
    w.sort(
      (
        a: any,
        b: any //对每一天的账单数据进行排序
      ) => dayJs(b.createdAt).valueOf() - dayJs(a.createdAt).valueOf() //按时间最新倒序排列
      //  dayJs(a.createTime).valueOf() - dayJs(b.createTime).valueOf()
    )
    w.map((k: any) => {
      //排序后再次遍历每一天的账单数据
      if (k.category === 'pay') {
        //如果账单的数据是支出
        currentPay += parseFloat(k.amount) //收集当天每一笔支出
      } else if (k.category === 'income') {
        //相反为收入
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

const getDate = () => { }
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

  width: 138px;
`
const DateWrapper = styled.div`
  display: flex;
  flex-direction: column-reverse;
`
const Statistics = () => {
  const history = useHistory()
  const [currentM, setCurrentM] = useState(new Date())
  const { records } = useRecord()
  const { currentPay, currentIncome } = ddd(records, currentM)
  let paixuhoude = ddd(records, currentM).paixuhoude
  console.log(paixuhoude, currentPay, currentIncome)
  if (!paixuhoude) {
    paixuhoude = []!
  }
  const getMonth = () => {
    let currentM = new Date()
    return dayJs(currentM).get('month') + 1
  }

  const getDate = function (index: any) {
    let objMap: any = {
      '1': '一',
      '2': '二',
      '3': '三',
      '4': '四',
      '5': '五',
      '6': '六',
      '0': '日'
    }
    if (!paixuhoude[index]) {
      return
    } else {
      console.log(paixuhoude[index][0].createdAt, '---')
      console.log('星期几', dayJs(paixuhoude[index][0].createdAt).get('day'))
      return `${getMonth()}月${index}号 星期${
        objMap[dayJs(paixuhoude[index][0].createdAt).get('day')]
        }`
    }
  }
  const getRecordsList = () => {
    console.log('paixuhoude:')
    console.log(paixuhoude)

    if (paixuhoude.length === 0) {
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
                  {value.map((www: any, index2: any) => {
                    return (
                      <ListItem onClick={() => { history.push(`/statistics/details/${index}/${index2}`) }} key={www.createdAt}>
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
            onChange={(a: any, b: any) => {
              let [year, month] = b.split('/')
              let x = parseInt(month) - 1
              setCurrentM(new Date(year, x))
            }}
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
