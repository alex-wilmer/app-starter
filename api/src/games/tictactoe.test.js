import { expect } from 'chai'
import { perfectMove } from './tictactoe'

describe(`perfectMove`, () => {
  it(`should be a function`, () => {
    expect(perfectMove).to.be.a(`function`)
  })

  it(`should try to win the game`, () => {
    let lastState = [
      [1, 1, 0], [-1, -1, 0], [0, 0, 0]
    ]

    expect(perfectMove(lastState, 1)[0]).to.eql([1, 1, 1])
  })
})
