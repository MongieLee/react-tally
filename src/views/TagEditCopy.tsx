import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useTags } from 'hooks/useTags'
import { useParams, useHistory } from 'react-router-dom'
import Layout from 'components/Layout'
import { Button } from 'components/Button'
import Icon from 'components/Icon'
import { useAllTags } from 'hooks/useAllTags'
import { Link } from 'react-router-dom'

const TagsWrapper = styled.div`
  p,
  ul {
    margin-bottom: 0;
  }
  height: 100vh;
  display: flex;
  flex-direction: column;
  .action-bar {
    background-color: rgb(255, 218, 71);
    font-size: 16px;
    display: flex;
    padding: 15px 10px;
    justify-content: space-between;
    .backFont {
      margin-left: 15px;
    }
  }
  .selectedTag {
    padding: 10px;
    font-size: 14px;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px #ddd solid;
  }
  .tag-item-wrapper {
    overflow: auto;
    p {
      color: #6d6a6a;
      font-size: 14px;
      padding: 10px 0 15px;
      text-align: center;
    }
    flex-grow: 1;
    // flex-wrap: wrap;
    .item-container {
      display: flex;
      flex-wrap: wrap;
      .tagItem {
        width: 25%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 10px;
        span {
          margin-top: 5px;
          font-size: 12px;
        }
      }
      .highLight {
        .icon {
          background: rgb(255, 218, 71);
        }
      }
      .icon {
        background: #f5f5f5;
        height: 40px;
        width: 40px;
        padding: 10px;
        border-radius: 50%;
      }
    }
  }
`

const TagEditw: React.FC = () => {
  // useEffect(() => {
  //   const localUserTags = window.localStorage.getItem('userTags')
  //   console.log(localUserTags)
  //   if (localUserTags) {
  //     console.log('i run')
  //     setUserTags(JSON.parse(localUserTags))
  //   } else {
  //     window.localStorage.setItem('userTags', JSON.stringify(userTags))
  //   }
  // }, [])
  const { getTags } = useAllTags()
  const { foods, life, play } = getTags()
  return (
    <TagsWrapper>
      <div className='action-bar'>
        <span>
          <Icon name='back' />
          <span className='backFont'>请选择标签</span>
        </span>
        <span>完成</span>
      </div>
      <div className='selectedTag'>
        <span>
          <span>已选中标签：</span>
          <span></span>
        </span>
        <span></span>
      </div>
      <div className='tag-item-wrapper'>
        <p>吃喝</p>
        <ul className='item-container'>
          {foods.map(item => {
            return (
              <li key={item.name} className='tagItem'>
                <Icon name={item.iconName} />
                <span>{item.name}</span>
              </li>
            )
          })}
        </ul>

        <p>日常</p>
        <ul className='item-container'>
          {life.map(item => {
            return (
              <li key={item.name} className='tagItem'>
                <Icon name={item.iconName} />
                <span>{item.name}</span>
              </li>
            )
          })}
        </ul>

        <p>娱乐</p>
        <ul className='item-container'>
          {play.map(item => {
            return (
              <li key={item.name} className='tagItem'>
                <Icon name={item.iconName} />
                <span>{item.name}</span>
              </li>
            )
          })}
        </ul>
      </div>
    </TagsWrapper>
  )
}
export { TagEditw }
