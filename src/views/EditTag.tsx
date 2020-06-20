import React from 'react'
import styled from 'styled-components'
import Layout from 'components/Layout'
import Icon from 'components/Icon'
import { HashRouter as Router, Switch, Route, Redirect, withRouter } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import dayJs from 'dayjs'
const EcordTitleWrapper = styled.div`
    .record-title {
  font-size: 17px;
  padding: 6px 0;
  background-color: rgb(255, 218, 71);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  .qqq {
    width: 40px;
    height: 40px;
    background-color: #fff;
    padding: 5px;
    border-radius: 50%;
    margin-bottom: 5px;
  }
  .click-item {
    position: absolute;
    left: 20px;
    top: 50%;
    transform: translateY(-50%);
    .icon {
      width: 30px;
      height: 30px;
    }
  }
}
    .info-wrapper {
  font-size: 16px;
  .info-title {
    color: #a6a6a6;
  }
  div {
    margin-left: 20px;
    margin-right: 5px;
    border-bottom: 1px #f5f5f5 solid;
    padding: 10px 0;
  }
}
.delete {
  button {
    min-width: 100%;
    border: none;
    padding: 10px;
    background-color: transparent;
    border-bottom: 1px #f5f5f5 solid;
  }
}
`

const _EditTag: React.FC = (props: any) => {
    let { day, id } = props.match.params
    const recordItem = JSON.parse(localStorage.getItem("paihaoxude") || '[]')[day][id];
    const history = useHistory()
    const deleteRecord = () => {
        let arr = JSON.parse(localStorage.getItem("recordList") || '[]');
        console.log(arr)
        arr.map((v:any) => {
            if (
                dayJs(v.createdAt).valueOf() ===
                dayJs(recordItem.createdAt).valueOf()
            ) {
                arr.splice(arr.indexOf(v), 1);
            }
        });
        localStorage.setItem("recordList", JSON.stringify(arr));
        history.goBack()
    }
    return (
        <Layout>
            <EcordTitleWrapper>
                <div className="record-title">
                    <Icon className="qqq" name={recordItem.tag.iconName} />
                    <span>{recordItem.tag.name}</span>
                    <span className="click-item">
                        <Icon name="back" onClick={() => { history.goBack() }} className="hh" />
                    </span>
                </div>
                <div className="info-wrapper">
                    <div>
                        <span className="info-title">类型：</span>
                        {recordItem.tag.tagType}
                    </div>
                    <div>
                        <span className="info-title">金额：</span>
                        {recordItem.amount}
                    </div>
                    <div>
                        <span className="info-title">时间：</span>
                        {recordItem.createdAt}
                    </div>
                    <div>
                        <span className="info-title">备注：</span>
                        {recordItem.note ? recordItem.note : '-'}
                    </div>
                </div>
                <div className="delete">
                    <button onClick={() => { deleteRecord() }}>删除</button>
                </div>
            </EcordTitleWrapper >
        </Layout >)
}

const EditTag = withRouter(_EditTag)
export { EditTag }