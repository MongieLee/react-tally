import styled from 'styled-components'
import React from 'react'
const Wrapper = styled.section`
  .output {
    background: #fff;
    line-height: 72px;
    font-size: 36px;
    text-align: right;
    padding: 0 16px;
    box-shadow: inset 0 -5px 5px -5px rgba(0, 0, 0, 0.25),
      inset 0 5px 5px -5px rgba(0, 0, 0, 0.25);
  }
  .numberPad {
    button {
      font-size: 18px;
      float: left;
      width: 25%;
      height: 64px;
      &.zero {
        width: 50%;
      }
      &.ok {
        float: right;
        height: 128px;
      }
    }
  }
`
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
    switch (text) {
      case '0':
      case '1':
      case '2':
      case '3':
      case '4':
      case '5':
      case '6':
      case '7':
      case '8':
      case '9':
        if (output === '0') {
          setOutput(text)
        } else {
          setOutput(output + text)
        }
        break
      case '.':
        if (output.indexOf('.') >= 0) {
          return
        }
        setOutput(output + '.')
        break
      case 'OK':
        alert('jizhang')
        break
      case 'C':
        setOutput('')
        break
      case 'Del':
        if (output.length === 1) {
          setOutput('')
        } else {
          setOutput(output.slice(0, -1))
        }
        break
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
