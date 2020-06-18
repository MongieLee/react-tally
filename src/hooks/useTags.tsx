import { useState, useEffect } from 'react'

const useTags = () => {
  const [tags, _setTags] = useState<{ name: string; iconName: string, tagType: string }[]>([])
  useEffect(() => {
    let tempTags = JSON.parse(window.localStorage.getItem('userTags') || '[]')
    if (tempTags.length === 0) {
      tempTags = [
        { name: "衣", iconName: "food", tagType: "吃喝" }
      ]
      _setTags(tempTags)
      window.localStorage.setItem('userTags', JSON.stringify(tempTags))
    }
  }, [])
  const setTags = (tagItem: any) => {
    _setTags([...tags, tagItem])
  }
  return {
    tags,
    setTags
  }
}
export { useTags }
