import React from 'react'
import styled from 'styled-components'
import { useTags } from 'hooks/useTags'
import { useParams, useHistory } from 'react-router-dom'
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
  const { findTag, updateTag, deleteTag } = useTags()
  let { id } = useParams<Params>()
  const tag = findTag(parseInt(id))
  const history = useHistory()
  const goBack = () => {
    history.goBack()
  }
  return (
    <Layout>
      <TopBar>
        <Icon
          name='left'
          onClick={() => {
            goBack()
          }}
        />
        编辑标签
        <Icon />
      </TopBar>
      {tag ? (
        <div>
          <InputWrapper>
            <label>
              <span>编辑标签名：</span>
              <input
                type='text'
                value={tag.name}
                onChange={e => {
                  updateTag(tag.id, { name: e.target.value })
                }}
                placeholder='标签'
              />
            </label>
          </InputWrapper>
          <ButtonWrapper>
            <Button
              onClick={() => {
                deleteTag(tag.id)
              }}
            >
              删除标签
            </Button>
          </ButtonWrapper>
        </div>
      ) : (
        <div>删除成功</div>
      )}
    </Layout>
  )
}
export { TagEdit }
