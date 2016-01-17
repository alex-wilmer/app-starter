// Dependencies

import React, { Component } from 'react'
import io from 'socket.io-client'

// Components

import { Center, Col } from 'components/Flex'
import HelloAgain from './Test'
import Stuff from './Test'

// Connect to server

let socket = io(`http://localhost:8000`)

export default class App extends Component {
  constructor () {
    super() // ignore

    this.state = {
      values: ['hello', '1112312323'],
      hue: 0
    }

    this.changeHue()
  }

  changeHue = time => {
    this.setState({ hue: time / 10 % 360 })
    requestAnimationFrame(this.changeHue)
  };

  componentWillUpdate() {
    console.log('updated!')
  }

  componentDidMount() {
    console.log('mounted!')
  }

  render () {
    let { values, hue } = this.state

    let saturation = 70
    let light = 40

    console.log(hue)

    return (
      <Center
        style = {{
        backgroundColor:
        `hsl(${hue}, ${saturation}%, ${light}%)`
        }}
      >
      { Math.floor(hue) % 2 === 0 &&
      <div>yo</div>
      }
      </Center>
    )
  }
}
