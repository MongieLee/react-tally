import React from 'react'
import styled from 'styled-components'
import { useTags } from 'useTags'
import { useParams } from 'react-router-dom'
import Layout from 'components/Layout'
import { Button } from 'components/Button'
const TopBar = styled.div`
  border: 1px red solid;
`
type Params = {
  id: string
}
const TagEdit: React.FC = () => {
  const { findTag } = useTags()
  let { id } = useParams<Params>()
  const tag = findTag(parseInt(id))
  return (
    <Layout>
      <TopBar>
        <span>返回 </span>编辑标签
      </TopBar>
      <label>
        <span>{tag.name}</span>
        <input type='text' placeholder='标签' />
      </label>
      <div></div>
      <Button>hahahah</Button>
    </Layout>
  )
}
export { TagEdit }
