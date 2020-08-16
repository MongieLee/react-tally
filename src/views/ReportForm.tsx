import React, { useState, useEffect } from 'react'
import Layout from 'components/Layout'
import styled from 'styled-components'
import myChart from "lib/echarts";
import dayJs from 'dayjs'
import { useRecord } from 'hooks/useRecord'

const TopBar = styled.div`
  background-color: rgb(255, 218, 71);
  padding: 11px 0;
  .type {
    text-align: center;
    margin-bottom: 10px;
    span {
      border: 1px #333 solid;
      padding: 5px;
      &.active {
        background-color: #333;
        color: rgb(255, 218, 71);
      }
    }
  }
  .company-date {
    display: flex;
    margin: 0 20px;
    text-align: center;
    li {
      width: 33.3333%;
      border: 1px #333 solid;
      &.active {
        background-color: #333;
        color: rgb(255, 218, 71);
      }
    }
  }
`

const LineChart = styled.div`
  height: 23vh;
`
const PieChart = styled.div`
  height: 42vh;
`
const getTimeText = (companyDate: any) => {
  let timeMap: any = {
    week: '本周',
    month: '本月',
    year: '今年'
  }
  return timeMap[companyDate]
}
const ClassWrapper = styled.div`
  font-size: 14px;
  padding: 10px 0 3px 35px;
  div {
    color: #999;
  }
`
const ReportForm = () => {
  const nullRecordObj: any = {
    week: [0, 0, 0, 0, 0, 0, 0],
    month: [
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0
    ],
    year: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  };
  const { records } = useRecord()
  const allRecord = records
  let [category, setCategory] = useState('pay')
  let [companyDate, setCompanyDate] = useState('month')
  let [totalAmount, setTotalAmount] = useState(0)
  const getMoney = (a: any) => {
    if (!a) { a = 0 }
    return a.toFixed(2)
  }
  let lineData = nullRecordObj[companyDate]

  let pieData = [{ value: 0, name: "暂无数据" }]
  let payOrIncomeList: any[] = []; //记录最终所有支出or收入金额结果数组
  let newArr: any = [];
  const handleTypeList: any = {
    week: () => {
      let o: any = [];
      totalAmount = 0
      let xxx = dayJs()
        .subtract(1, "day")
        .startOf("week");
      for (let i = 1; i < 8; i++) {
        o.push(xxx.add(i, "day").unix());
      }
      allRecord.forEach((v: any) => {
        if (o.indexOf(
          dayJs(v.createdAt)
            .hour(0)
            .minute(0)
            .second(0)
            .millisecond(0)
            .unix()
        ) >= 0) {
          newArr.push(v);
        }
      }); //筛选
      let tempPieData: any = {};
      newArr.forEach((value: any) => {
        if (value.category === category) {
          let valueType = value.tag.tagType;
          if (tempPieData[valueType] === undefined) {
            tempPieData[valueType] = value.amount;
          } else {
            tempPieData[valueType] += value.amount;
          }
        }
      });

      if (Object.keys(tempPieData).length > 0) {
        let pieList: any[] = [];
        for (let item in tempPieData) {
          pieList.push({ value: tempPieData[item], name: item });
        }
        pieData = pieList;
      }
      for (let i = 0; i < 7; i++) {
        payOrIncomeList[i] = []
      }
      for (let i = 0; i < 7; i++) {
        newArr.forEach((v: any) => {
          //得到本周7天每一天的账单数据
          if (dayJs(v.createdAt).day() === i) {
            if (dayJs(v.createdAt).day() === 0) {
              payOrIncomeList[6].push(v);
            } else {
              payOrIncomeList[i - 1].push(v);
            }
          }
        });
      }
      payOrIncomeList.forEach((v, index) => {
        //31天每一天的总金额
        if (v.length === 0) {
          payOrIncomeList[index] = 0; //没有数据则当天为0
        } else {
          let count = 0;
          v.forEach((value: any) => {
            //遍历有数据的那天
            if (value.category === category) {
              count += parseFloat(value.amount);
            }
          });
          payOrIncomeList[index] = count;
        }
      });
      payOrIncomeList.forEach(value => {
        totalAmount += value;
      });
      lineData = payOrIncomeList


    },
    month: () => {
      let newArr2: any[] = [];
      totalAmount = 0
      newArr = [];
      allRecord.forEach(v => {
        dayJs(v.createdAt).year() === dayJs(new Date()).year() &&
          newArr2.push(v);
      }); //筛选出账单类别中所有属于本年的账单newArr
      newArr2.forEach(v => {
        dayJs(v.createdAt).month() === dayJs(new Date()).month() &&
          newArr.push(v);
      }); //筛选出账单类别中所有属于本月的账单newArr

      let tempPieData: any = {};
      newArr.forEach((value: any) => {
        if (value.category === category) {
          let valueType: any = value.tag.tagType;
          if (tempPieData[valueType] === undefined) {
            tempPieData[valueType] = value.amount;
          } else {
            tempPieData[valueType] += value.amount;
          }
        }
      });
      if (!(Object.keys(tempPieData).length === 0)) {
        let pieList = [];
        for (let item in tempPieData) {
          pieList.push({ value: tempPieData[item], name: item });
        }
        pieData = pieList;
      }
      payOrIncomeList = []
      for (let i = 0; i < 31; i++) {
        payOrIncomeList[i] = []
      }
      for (let i = 0; i < 31; i++) {
        newArr.forEach((v: any) => {
          //得到本月31天每一天的账单数据
          if (dayJs(v.createTime).date() === i + 1) {
            payOrIncomeList[i].push(v);
          }
        });
      }
      payOrIncomeList.forEach((v: any, index: any) => {
        //31天每一天的总金额
        if (v.length === 0) {
          payOrIncomeList[index] = 0; //没有数据则当天为0
        } else {
          let count = 0;
          v.forEach((value: any) => {
            //遍历有数据的那天
            if (value.category === category) {
              count += parseFloat(value.amount);
            }
          });
          payOrIncomeList[index] = count;
        }
      });
      payOrIncomeList.forEach((value: any) => {
        totalAmount += value;
      });
      lineData = payOrIncomeList;
    },
    year: () => {
      totalAmount = 0
      newArr = [];
      allRecord.forEach(v => {
        dayJs(v.createdAt).year() === dayJs(new Date()).year() &&
          newArr.push(v);
      }); //筛选出账单类别中所有属于本年的账单newArr

      let tempPieData: any = {};
      newArr.forEach((value: any) => {
        if (value.category === category) {
          let valueType = value.tag.tagType;
          if (tempPieData[valueType] === undefined) {
            tempPieData[valueType] = value.amount;
          } else {
            tempPieData[valueType] += value.amount;
          }
        }
      });
      if (!(Object.keys(tempPieData).length === 0)) {
        let pieList = [];
        for (let item in tempPieData) {
          pieList.push({ value: tempPieData[item], name: item });
        }
        pieData = pieList;
      }
      payOrIncomeList = []
      //折线图
      for (let i = 0; i < 12; i++) {
        payOrIncomeList[i] = []
      }
      for (let i = 0; i < 12; i++) {
        newArr.forEach((v: any) => {
          //得到本月31天每一天的账单数据
          if (dayJs(v.createdAt).month() === i) {
            payOrIncomeList[i].push(v);
          }
        });
      }
      payOrIncomeList.forEach((v, index) => {
        //31天每一天的总金额
        if (v.length === 0) {
          payOrIncomeList[index] = 0; //没有数据则当天为0
        } else {
          let count = 0;
          v.forEach((value: any) => {
            //遍历有数据的那天
            if (value.category === category) {
              count += parseFloat(value.amount);
            }
          });
          payOrIncomeList[index] = count;
        }
      });
      payOrIncomeList.forEach(value => {
        totalAmount += value;
      });
      lineData = payOrIncomeList;
    }
  }

  useEffect(() => {
    drawCharts(companyDate)
    // eslint-disable-next-line
  }, [category, companyDate, records])
  const drawCharts = (companyDate: any) => {
    handleTypeList[companyDate]()
    setTotalAmount(totalAmount)

    myChart.createLineChart(
      "lineChart",
      companyDate,
      lineData,
      category
    );
    myChart.createPieChart("pieChart", pieData);
  }

  return (
    <Layout>
      <TopBar>
        <div className='type'>
          <span
            onClick={() => {
              setCategory('pay')
            }}
            className={category === 'pay' ? 'active' : ''}
          >
            支出
          </span>
          <span
            onClick={() => {
              setCategory('income')
              drawCharts(companyDate)
            }}
            className={category === 'income' ? 'active' : ''}
          >
            收入
          </span>
        </div>

        <ul className='company-date'>
          <li
            onClick={() => {
              setCompanyDate('week')
            }}
            className={companyDate === 'week' ? 'active' : ''}
          >
            周
          </li>
          <li
            onClick={() => {
              setCompanyDate('month')
            }}
            className={companyDate === 'month' ? 'active' : ''}
          >
            月
          </li>
          <li
            onClick={() => {
              setCompanyDate('year')
            }}
            className={companyDate === 'year' ? 'active' : ''}
          >
            年
          </li>
        </ul>
      </TopBar>

      <ClassWrapper>
        {getTimeText(companyDate)}
        <div>{category === 'pay' ? '总支出: ' : '总收入: '}{getMoney(totalAmount)}</div>
      </ClassWrapper>
      <LineChart id='lineChart' />
      <PieChart id='pieChart' />
    </Layout>
  )
}

export default ReportForm
