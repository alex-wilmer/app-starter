import chalk from 'chalk'
import { getRooms, setRooms } from '../state/rooms'
import ttt, { randomMove, perfectMove } from '../games/tictactoe'

export default ({
  io, socket
}) => {
  socket.on(`ui:makeMove`, ({ id, x, y }) => {
    // TODO: check that the correct user made the move

    let rooms = getRooms()
    let room = rooms.filter(x => x.id === id)[0]
    let { game } = room

    game.state = [
      ...game.state,
      game.state[game.state.length - 1].map((row, i) => {
        if (i === x) {
          return row.map((cell, i) => {
            if (i === y) {
              return game.state.length % 2 === 0 ? 1 : -1
            } else {
              return cell
            }
          })
        } else {
          return row
        }
      })
    ]

    if (
      game.state.length > 5 &&
      ttt(game.state[game.state.length - 1], 3)
    ) {
      room.messages = [
        ...room.messages,
        {
          id: room.id,
          message: `${game.turn} has won!`,
          time: +new Date(),
          username: `zen-games`,
        }
      ]

      game.winner = game.turn

      console.log(chalk.yellow(
        `${game.turn} has won ${room.game.name} in room ${room.id}!`
      ))
    }

    if (!game.winner) {
      game.turn =
        room.users.filter(x => x.username !== game.turn)[0].username

      if (game.turn === `ai`) {
        game.state = [
          ...game.state,
          room.users.filter(x => x.username === `ai`)[0].type === `weak`
          ? randomMove(
              room.game.state[room.game.state.length - 1],
              room.game.state.length
            )
          : perfectMove(room.game)
        ]

        if (
          game.state.length > 5 &&
          ttt(game.state[game.state.length - 1], 3)
        ) {
          room.messages = [
            ...room.messages,
            {
              id: room.id,
              message: `${game.turn} has won!`,
              time: +new Date(),
              username: `zen-games`,
            }
          ]

          game.winner = game.turn

          console.log(chalk.yellow(
            `${game.turn} has won ${room.game.name} in room ${room.id}!`
          ))
        } else {
          game.turn =
            room.users.filter(x => x.username !== game.turn)[0].username
        }
      }
    }

    room.game = game

    rooms = [
      ...rooms.filter(x => x.id !== id),
      room
    ]

    io.emit(`api:updateRooms`, { rooms })
    setRooms({ rooms })
  })
}
