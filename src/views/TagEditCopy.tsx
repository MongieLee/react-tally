import React, { useState } from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'
import Icon from 'components/Icon'
import { useAllTags } from 'hooks/useAllTags'
import { useTags } from 'hooks/useTags'

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
  const history = useHistory()
  const goBack = () => {
    history.goBack()
  }
  useTags()
  const tags = JSON.parse(localStorage.getItem('userTags') || '[]')!
  console.log(tags)
  const [defaultSelected, setDefaultSelected] = useState({
    name: '餐饮',
    tagType: '吃喝',
    iconName: 'food'
  })
  const { getTags } = useAllTags()
  const { foods, life, play } = getTags()

  const selectedTagEvent = (
    name: string,
    tagType: string,
    iconName: string
  ) => {
    setDefaultSelected({ name, tagType, iconName })
  }
  const aaa = (item: any) => {
    let m = tags.filter((a: any) => {
      console.log(JSON.stringify(a) === JSON.stringify(item))

      return JSON.stringify(a) === JSON.stringify(item)
    })
    console.log('这是tags')
    console.log(m)
    if (m.length > 0) {
      alert('不能重复选择标签')
    } else {
      let tempList = [...tags, item]
      console.log(tempList)
      window.localStorage.setItem('userTags', JSON.stringify(tempList))
      history.push(`/money`)
    }
  }
  return (
    <TagsWrapper>
      <div className='action-bar'>
        <span>
          <Icon
            name='back'
            onClick={() => {
              goBack()
            }}
          />
          <span className='backFont'>请选择标签</span>
        </span>
        <span
          onClick={() => {
            aaa(defaultSelected)
          }}
        >
          完成
        </span>
      </div>
      <div className='selectedTag'>
        <span>
          <span>已选中标签：</span>
          <span>{defaultSelected.name}</span>
        </span>
        <span>{defaultSelected.tagType}</span>
      </div>
      <div className='tag-item-wrapper'>
        <p>吃喝</p>
        <ul className='item-container'>
          {foods.map(item => {
            return (
              <li
                onClick={() => {
                  selectedTagEvent(item.name, item.tagType, item.iconName)
                }}
                key={item.name}
                className={`tagItem ${
                  item.name === defaultSelected.name ? 'highLight' : ''
                }`}
              >
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
              <li
                onClick={() => {
                  selectedTagEvent(item.name, item.tagType, item.iconName)
                }}
                key={item.name}
                className={`tagItem ${
                  item.name === defaultSelected.name ? 'highLight' : ''
                }`}
              >
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
              <li
                onClick={() => {
                  selectedTagEvent(item.name, item.tagType, item.iconName)
                }}
                key={item.name}
                className={`tagItem ${
                  item.name === defaultSelected.name ? 'highLight' : ''
                }`}
              >
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
