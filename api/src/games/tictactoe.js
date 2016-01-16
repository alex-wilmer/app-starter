import _ from 'ramda'
import chalk from 'chalk'

const mapSum = // matrix -> list
    _.map(_.sum)

const transpose = // matrix -> matrix
  matrix => matrix[0].map((cell, index) => matrix.map(row => row[index]))

const diagonal = // matrix -> list
  matrix => matrix.map((row, index) => matrix[index][index])

const sumVertical = // matrix -> list
  _.compose(mapSum, transpose)

const sumDiagonalLR = // matrix -> list
  _.compose(_.sum, diagonal)

const sumDiagonalRL = // matrix -> list
  _.compose(_.sum, diagonal, _.reverse)

const determine = // ([array], integer) -> boolean
  (matrix, length) => {
    return (
      Math.abs(sumDiagonalLR(matrix)) === length
      || Math.abs(sumDiagonalRL(matrix)) === length
      || mapSum(matrix).some(n => Math.abs(n) === length)
      || sumVertical(matrix).some(n => Math.abs(n) === length)
    )
  }

export default determine

export const randomMove =
  (matrix, length) => {
    let choice, x, y
    while (choice !== 0) {
      x = Math.floor(Math.random() * 3)
      y = Math.floor(Math.random() * 3)
      choice = matrix[x][y]
    }
    return matrix.map((row, i) => {
      if (i === x) {
        return row.map((cell, i) => {
          if (i === y) {
            return length % 2 === 0 ? 1 : -1
          } else {
            return cell
          }
        })
      } else {
        return row
      }
    })
  }


export const perfectMove =
  (lastState, XO) => {
    let score = (turn, depth) => {
      if (depth) return 10
      return -10
    }

    let choice

    let minimax = (lastState, depth) => {
      if (determine(lastState, 3)) {
        console.log(chalk.magenta('gameover!!!'))
        return score(turn)
      }

      let moves = []
      let nextStates = []

      // find all available moves
      // call minimax on them, adding the result and the move to an array

      lastState.forEach((row, x) => {
        row.forEach((cell, y) => {
          if (lastState[x][y] === 0) {
            nextStates = [
              ...nextStates,
              lastState.map((row, i) => {
                if (i === x) {
                  return row.map((cell, i) => {
                    if (i === y) {
                      return turn === `ai` ? 1 : -1
                    } else {
                      return cell
                    }
                  })
                } else {
                  return row
                }
              })
            ]
          }
        })
      })

      console.log('Next States: ', nextStates)

      nextStates.forEach(nextState => {
        moves = [
          ...moves,
          {
            state: nextState,
            score: minimax(nextState)
          }
        ]
      })

      if (turn === `ai`) {
        turn = `player`
        choice = moves.reduce((acc, val) => ({
          score: acc.score > val.score ? acc.score : val.score,
          state: acc.score > val.score ? acc.state : val.state
        }), { score: 0 })
        return choice.score
      } else {
        turn = `ai`
        choice = moves.reduce((acc, val) => ({
          score: acc.score < val.score ? acc.score : val.score,
          state: acc.score < val.score ? acc.state : val.state
        }), { score: 0 })
        return choice.score
      }
    }

    minimax(lastState)
    console.log(`we're done!`, choice.state)
  }
