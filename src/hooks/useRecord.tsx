import { useState, useEffect } from 'react'
import { useUpdate } from 'hooks/useUpdate'

type newRecordItem = {
  tag: {}
  note: string
  category: 'pay' | 'income'
  amount: number
}

export type RecordItem = newRecordItem & {
  createdAt: string //ISO 8601
}
export const useRecord = () => {
  const [records, setRecords] = useState<RecordItem[]>([])

  useEffect(() => {
    setRecords(JSON.parse(window.localStorage.getItem('recordList') || '[]'))
  }, [])
  const addRecord = (newRecord: newRecordItem) => {
    const record = { ...newRecord, createdAt: new Date().toISOString() }
    setRecords([...records, record])
  }
  useUpdate(() => {
    window.localStorage.setItem('recordList', JSON.stringify(records))
  }, [records])
  return { records, addRecord }
}
