import React, { useState } from 'react'
import { Wrapper } from './NumberPadSection/Wrapper'
import { generateOutput } from './NumberPadSection/generateOutput'

type Props = {
  amount: number
  onChange: (amout: number) => void
  onOk: () => void
}

const NumberPadSection: React.FC<Props> = props => {
  const [output, _setOutput] = useState(props.amount.toString())
  const setOutput = (output: string) => {
    let newOutput: string
    if (output.length > 10) {
      newOutput = output.slice(0, 10)
    } else if (output.length === 0) {
      newOutput = '0'
    } else {
      newOutput = output
    }
    _setOutput(newOutput)
    props.onChange(parseFloat(newOutput))
  }
  const onClick = (e: React.MouseEvent) => {
    const text = (e.target as HTMLButtonElement).textContent
    if (text === null) return
    if (text === 'OK') {
      props.onOk && props.onOk()
    }
    if (
      '1234567890.C'
        .split('')
        .concat(['Del'])
        .indexOf(text) >= 0
    ) {
      setOutput(generateOutput(text, output))
    }
  }
  return (
    <Wrapper>
      <div className='output'>{output}</div>
      <div className='numberPad clearfix' onClick={onClick}>
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
