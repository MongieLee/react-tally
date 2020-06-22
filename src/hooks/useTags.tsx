import { useState, useEffect } from 'react'

const useTags = () => {
  const [tags, _setTags] = useState<
    { name: string; iconName: string; tagType: string }[]
  >([])
  useEffect(() => {
    let tempTags = JSON.parse(window.localStorage.getItem('userTags') || '[]')
    if (tempTags.length === 0) {
      tempTags = [
        {
          name: '餐饮',
          tagType: '吃喝',
          iconName: 'food'
        },
        {
          name: '交通',
          tagType: '日常',
          iconName: 'traffic'

        },
        {
          name: '工资',
          tagType: '日常',
          iconName: 'wages'
        },
        {
          name: '外卖',
          tagType: '吃喝',
          iconName: 'takeOutFood',
        },
        {
          name: '医疗',
          tagType: '日常',
          iconName: 'medicalCare'
          
        },
        {
          name: '其他',
          tagType: '日常',
          iconName: 'other'
          
        },]
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
