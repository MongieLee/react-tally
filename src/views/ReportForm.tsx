import React, { useState, useEffect } from 'react'
import Layout from 'components/Layout'
import styled from 'styled-components'
import myChart from "lib/echarts";
import dayJs from 'dayjs'
import { useRecord } from 'hooks/useRecord'
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
        .startOf("week")
      if (xxx.day() === 0) {
        xxx = xxx.subtract(6, 'day')
      }
      for (let i = 0; i < 7; i++) {
        o.push(xxx.add(i, "day").valueOf());
      }
      console.log(xxx)
      console.log('o:');
      console.log(o);
      allRecord.forEach((v: any) => {
        
        if (o.indexOf(
          dayJs(v.createdAt)
            .hour(0)
            .minute(0)
            .second(0)
            .millisecond(0)
            .valueOf()
        ) >= 0) {
          newArr.push(v);
        }
      }); //筛选
      console.log(`本周账单`, newArr)



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
        payOrIncomeList[i] = []
      }
      console.log(newArr)
      for (let i = 0; i < 7; i++) {
        newArr.forEach((v: any) => {
          //得到本周7天每一天的账单数据
          if (dayJs(v.createdAt).day() === i) {
            if (dayJs(v.createdAt).day() === 0) {
              payOrIncomeList[6].push(v);
            } else {
              console.log(dayJs(v.createdAt).day())
              payOrIncomeList[i - 1].push(v);
            }
          }
        });
      }
      console.log(`payOrIncomeList`);
      console.log(payOrIncomeList);
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
      console.log(lineData)












    },
    month: () => {
      let newArr2: any[] = [];
      totalAmount = 0
      newArr = [];
      allRecord.forEach(v => {
        dayJs(v.createdAt).year() === dayJs(new Date()).year() &&
          newArr2.push(v);
      }); //筛选出账单类别中所有属于本年的账单newArr
      console.log("这是今年的账单", newArr);
      console.log("这是月");
      newArr2.forEach(v => {
        dayJs(v.createdAt).month() === dayJs(new Date()).month() &&
          newArr.push(v);
      }); //筛选出账单类别中所有属于本月的账单newArr

      let tempPieData: any = {};
      newArr.forEach((value: any) => {
        console.log(value.category === category);
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
        console.log(pieData);
      }
      payOrIncomeList= []
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
      console.log(payOrIncomeList)
      lineData = payOrIncomeList;
      console.log(totalAmount)
    },
    year: () => {
      totalAmount = 0
      newArr = [];
      allRecord.forEach(v => {
        dayJs(v.createdAt).year() === dayJs(new Date()).year() &&
          newArr.push(v);
      }); //筛选出账单类别中所有属于本年的账单newArr
      console.log("这是今年的账单", newArr);

      let tempPieData: any = {};
      newArr.forEach((value: any) => {
        console.log(value.category === category);
        if (value.category === category) {
          let valueType = value.tag.tagType;
          if (tempPieData[valueType] === undefined) {
            tempPieData[valueType] = value.amount;
          } else {
            tempPieData[valueType] += value.amount;
          }
        }
      });
      console.log(tempPieData, "tempPieData");
      if (!(Object.keys(tempPieData).length === 0)) {
        let pieList = [];
        for (let item in tempPieData) {
          pieList.push({ value: tempPieData[item], name: item });
        }
        console.log(`pieList`);
        console.log(pieList);
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
      console.log("payOrIncomeList", payOrIncomeList);
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
      console.log(payOrIncomeList)
      payOrIncomeList.forEach(value => {
        totalAmount += value;
      });
      lineData = payOrIncomeList;
    }
  }
  function pingjunshu(totalAmount: any) {
    console.log(typeof totalAmount)
    if (companyDate === "week")
      return (totalAmount / 7).toFixed(2);
    if (companyDate === "month")
      return (totalAmount / 31).toFixed(2);
    if (companyDate === "year")
      return (totalAmount / 12).toFixed(2);
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
        <div>{category === 'pay' ? '平均支出: ' : '平均收入: '} {pingjunshu(totalAmount)}</div>
      </ClassWrapper>
      <LineChart id='lineChart' />
      <PieChart id='pieChart' />
    </Layout>
  )
}

export default ReportForm
