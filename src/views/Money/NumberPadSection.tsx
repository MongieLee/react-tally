import React from 'react'
import { Wrapper } from './NumberPadSection/Wrapper'
import { generateOutput } from './NumberPadSection/generateOutput'
const NumberPadSection: React.FC = () => {
  const [output, _setOutput] = React.useState('0')
  const setOutput = (output: string) => {
    if (output.length > 10) {
      output = output.slice(0, 10)
    } else if (output.length === 0) {
      output = '0'
    }
    _setOutput(output)
  }
  const x = (e: React.MouseEvent) => {
    const text = (e.target as HTMLButtonElement).textContent
    if (text === null) return
    if (text === 'OK') {
      alert('提交')
    }
    if('1234567890.C'.split('').concat(['Del']).indexOf(text)>=0){
      setOutput(generateOutput(text,output))
    }
  }
  return (
    <Wrapper>
      <div className='output'>{output}</div>
      <div className='numberPad clearfix' onClick={x}>
        <button>1</button>
        <button>2</button>
        <button>3</button>
        <button>Del</button>
        <button>4</button>
        <button>5</button>
        <button>6</button>
        <button>C</button>
        <button>7</button>
        <button>8</button>
        <button>9</button>
        <button className='ok'>OK</button>
        <button className='zero'>0</button>
        <button>.</button>
      </div>
    </Wrapper>
  )
}

export { NumberPadSection }
