import { useState } from 'react'

const useAllTags = () => {
  const _allTagsList = {
    foods: [
      {
        id: 0,
        name: '餐饮',
        iconName: 'food',
        tagType: '吃喝'
      },
      {
        id: 1,
        name: '水果',
        iconName: 'fruits',
        tagType: '吃喝'
      },
      {
        id: 2,
        name: '酒水',
        iconName: 'drinks',
        tagType: '吃喝'
      },
      {
        id: 3,
        name: '零食',
        iconName: 'snacks',
        tagType: '吃喝'
      },
      {
        id: 4,
        name: '买菜',
        iconName: 'buyVegetables',
        tagType: '吃喝'
      },
      {
        id: 5,
        name: '外卖',
        iconName: 'takeOutFood',
        tagType: '吃喝'
      },
      {
        id: 6,
        name: '奶茶',
        iconName: 'teaWithMilk',
        tagType: '吃喝'
      }
    ],
    life: [
      {
        id: 0,
        name: '房租',
        iconName: 'rent',
        tagType: '日常'
      },
      {
        id: 1,
        name: '水电',
        iconName: 'hydropower',
        tagType: '日常'
      },
      {
        id: 2,
        name: '日用',
        iconName: 'dailyExpenses',
        tagType: '日常'
      },
      {
        id: 3,
        name: '维护',
        iconName: 'maintain',
        tagType: '日常'
      },
      {
        id: 4,
        name: '医疗',
        iconName: 'medicalCare',
        tagType: '日常'
      },
      {
        id: 5,
        name: '交通',
        iconName: 'traffic',
        tagType: '日常'
      },
      {
        id: 5,
        name: '工资',
        iconName: 'wages',
        tagType: '日常'
      },
      {
        id: 6,
        name: '其他',
        iconName: 'other',
        tagType: '日常'
      }
    ],
    play: [
      {
        id: 0,
        name: '电商',
        iconName: 'onlineShopping',
        tagType: '娱乐'
      },
      {
        id: 1,
        name: '游戏',
        iconName: 'game',
        tagType: '娱乐'
      },
      {
        id: 2,
        name: '宠物',
        iconName: 'pets',
        tagType: '娱乐'
      },
      {
        id: 3,
        name: '彩票',
        iconName: 'lottery',
        tagType: '娱乐'
      }
    ]
  }
  const [allTagsList] = useState(_allTagsList)
  const getTags = () => {
    return allTagsList
  }
  return {
    getTags
  }
}
export { useAllTags }
