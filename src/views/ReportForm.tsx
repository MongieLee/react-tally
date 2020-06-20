import React, { useState, useEffect } from 'react'
import Layout from 'components/Layout'
import styled from 'styled-components'
import myChart from "lib/echarts";
import dayJs from 'dayjs'
console.log(myChart)
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
    width: 100vw;
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
let allRecord = JSON.parse(localStorage.getItem('recordList') || '[]');
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

  let [category, setCategory] = useState('pay')
  let [companyDate, setCompanyDate] = useState('month')
  let [currentList, setCurrentList] = useState([])
  let [totalAmount, setTotalAmount] = useState(0)
  let lineData = nullRecordObj[companyDate]
  let pieData = [{ value: 0, name: "暂无数据" }]
  let payOrIncomeList: any[] = []; //记录最终所有支出or收入金额结果数组
  const handleTypeList = {
    week: () => {
      let newArr: any = [];
      let o: any = [];
      let xxx = dayJs()
        .startOf("week")
        .add(1, "day");
      for (let i = 0; i < 7; i++) {
        o.push(xxx.add(i, "day").valueOf());
      }
      console.log(o);
      allRecord.map((v: any) => {
        o.indexOf(
          dayJs(v.createAt)
            .hour(0)
            .minute(0)
            .second(0)
            .millisecond(0)
            .valueOf()
        ) >= 0 && newArr.push(v);
      }); //筛选
      console.log(`本周账单`, newArr)



      let tempPieData: any = {};
      newArr.map((value: any) => {
        console.log(value.category === category);
        if (value.category === category) {
          let valueType = value.category;
          if (tempPieData[valueType] === undefined) {
            tempPieData[valueType] = value.amount;
          } else {
            tempPieData[valueType] += value.amount;
          }
        }
      });
      console.log(tempPieData);

      if (Object.keys(tempPieData).length > 0) {
        let pieList: any[] = [];
        for (let item in tempPieData) {
          pieList.push({ value: tempPieData[item], name: item });
        }
        pieData = pieList;
        console.log(`这是最终的结果`, pieList);
      }
      for (let i = 0; i < 7; i++) {
        newArr.map((v: any) => {
          //得到本月31天每一天的账单数据
          if (!payOrIncomeList[i]) {
            payOrIncomeList[i] = [];
          }
          if (dayJs(v.createTime).day() === i) {
            if (i === 0) {
              payOrIncomeList[6].push(v);
            } else {
              payOrIncomeList[i - 1].push(v);
            }
          }
        });
      }
      console.log(`payOrIncomeList`);
      console.log(payOrIncomeList);
      payOrIncomeList.map((v, index) => {
        //31天每一天的总金额
        if (v.length === 0) {
          payOrIncomeList[index] = 0; //没有数据则当天为0
        } else {
          let count = 0;
          v.map((value:any) => {
            //遍历有数据的那天
            if (value.type === category) {
              count += parseFloat(value.amount);
            }
          });
          payOrIncomeList[index] = count;
        }
      });
      payOrIncomeList.map(value => {
        totalAmount += value;
      });
      lineData = payOrIncomeList
      console.log(lineData)












    },
    month: () => { },
    year: () => { }
  }
  useEffect(() => {
    if (allRecord.length > 0) {
      console.log('121212')
    }
    drawCharts()
  })
  const drawCharts = () => {
    handleTypeList['week']()
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
              drawCharts()
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
        <div>{category === 'pay' ? '总支出: ' : '总收入: '}{totalAmount}</div>
        <div>{category === 'pay' ? '平均支出: ' : '平均收入: '}</div>
      </ClassWrapper>
      <LineChart id='lineChart' />
      <PieChart id='pieChart' />
    </Layout>
  )
}

export default ReportForm
