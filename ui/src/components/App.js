// Dependencies

import React, { Component } from 'react'
import io from 'socket.io-client'

// Components

import { Center } from 'components/Flex'

// Connect to server

let socket = io(`http://localhost:8000`)

export default class App extends Component {
  constructor () {
    super()
  }

  render () {
    return (
      <Center>
        <h1>Hello there. Let's get started.</h1>
      </Center>
    )
  }
}
