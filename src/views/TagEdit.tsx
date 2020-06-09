import React from 'react'
import styled from 'styled-components'
import { useTags } from 'useTags'
import { useParams } from 'react-router-dom'
import Layout from 'components/Layout'
import { Button } from 'components/Button'
import Icon from 'components/Icon'
const TopBar = styled.div`
  padding: 10px;
  background-color: white;
  display: flex;
  line-height: 20px;
  justify-content: space-between;
  align-items: center;
`
const InputWrapper = styled.div`
  background-color: white;
  margin-top: 20px;
  padding: 10px;
  label {
    align-items: center;
    display: flex;
    span {
      white-space: nowrap;
      margin-right: 16px;
    }
    input {
      width: 100%;
      height: 40px;
      border: none;
      background: none;
    }
  }
`
const ButtonWrapper = styled.div`
  padding-top: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
`

type Params = {
  id: string
}

const TagEdit: React.FC = () => {
  const onChange = (e: any) => {
    console.log(e.tagget.value)
  }
  const { findTag } = useTags()
  let { id } = useParams<Params>()
  const tag = findTag(parseInt(id))
  return (
    <Layout>
      <TopBar>
        <Icon name='left' />
        编辑标签
        <Icon />
      </TopBar>
      <InputWrapper>
        <label>
          <span>编辑标签名：</span>
          <input
            type='text'
            value={tag.name}
            onChange={e => {
              onChange(e)
            }}
            placeholder='标签'
          />
        </label>
      </InputWrapper>
      <ButtonWrapper>
        <Button>删除标签</Button>
      </ButtonWrapper>
    </Layout>
  )
}
export { TagEdit }
