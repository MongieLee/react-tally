import { useState, useEffect } from 'react'
import { createId } from 'lib/createId'
import { useUpdate } from 'hooks/useUpdate'

const useTags = () => {
  const [tags, setTags] = useState<{ id: number; name: string }[]>([])
  useEffect(() => {
    let tempTags = JSON.parse(window.localStorage.getItem('tags') || '[]')
    if (tempTags.length === 0) {
      tempTags = [
        { id: createId(), name: '衣' },
        { id: createId(), name: '食' },
        { id: createId(), name: '住' },
        { id: createId(), name: '行' }
      ]
    }
    setTags(tempTags)
  }, [])
  useUpdate(() => {
    window.localStorage.setItem('tags', JSON.stringify(tags))
  }, [tags])
  const addTag = () => {
    const tagName = window.prompt('新标签的名称为：')
    if (tagName !== null && tagName !== '') {
      setTags([...tags, { id: createId(), name: tagName }])
    }
  }
  const findTag = (id: number) => {
    return tags.filter(tag => tag.id === id)[0]
  }
  const findTagIndex = (id: number) => {
    let result = -1
    for (let i = 0; i < tags.length; i++) {
      if (tags[i].id === id) {
        result = i
        break
      }
    }
    return result
  }
  const updateTag = (id: number, obj: { name: string }) => {
    let index = findTagIndex(id)
    const tagsClone = [...tags]
    tagsClone.splice(index, 1, { id, name: obj.name })
    setTags(tags.map(tag => (tag.id === id ? { id, name: obj.name } : tag)))
  }
  const deleteTag = (id: number) => {
    setTags(tags.filter(tag => tag.id !== id))
  }
  return { addTag, tags, setTags, findTag, findTagIndex, updateTag, deleteTag }
}
export { useTags }
