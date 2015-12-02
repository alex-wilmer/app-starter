import React from 'react'
import { render } from 'react-dom'

let ImagesList = ({ images = [] }) =>
  <div>
    { images.map(
        image =>
          <img src={ image.data.thumbnail } />
      )
    }
  </div>

let NamesList = ({ names }) =>
  <ul>
    { names.map(
        name =>
          <li>Name: { name }</li>
      )
    }
  </ul>

let SeafoamButton = ({ handleClick, message }) =>
  <button
    onClick={ () => handleClick('bananas') }
    style={{
      fontSize: '3em',
      background: 'rgb(50, 223, 141)'
    }}
  >
    { message }
  </button>

class App extends React.Component {
  constructor () {
    super()

    this.state = {
      message: 'Hello message!!!!',
      names: [
        'alice', 'bob', 'joe'
      ]
    }
  }

  getImages = () => {
    fetch('https://www.reddit.com/r/toronto.json')
      .then(response => response.json())
      .then(({data}) => {
        console.log(data.children)

        this.setState({ images: data.children })
      })
  }

  changeMessage = (value) => {
    this.setState({ message: value })
  }

  render () {
    return (
      <div>
        <SeafoamButton
          message={ this.state.message }
          handleClick={ this.changeMessage }
        />

        <NamesList
          names={ this.state.names }
        />

        <ImagesList
          images={ this.state.images }
        />

        <button onClick={ this.getImages }>get images</button>
      </div>
    )
  }
}

render(
  <App />,
  document.getElementById('app')
)
