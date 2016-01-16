import chalk from 'chalk'
import ttt, { randomMove, perfectMove } from '../games/tictactoe'
import { getRooms, setRooms } from '../state/rooms'

export default ({
  io, socket
}) => {
  socket.on(`ui:startGame`, ({ ai, id, username }) => {
    let rooms = getRooms()
    let room = rooms.filter(x => x.id === id)[0]
    let user = room.users.filter(x => x.username === username)[0]

    user.ready = true

    room.users = [
      ...room.users.filter(x => x.username !== username),
      user
    ]

    if (ai) {
      room.users = [
        ...room.users,
        {
          ready: true,
          type: ai,
          username: `ai`
        }
      ]
    }

    if (room.users.filter(x => x.ready).length === room.game.players) {
      room.game.started = true

      room.game.turn =
        room.users[
          Math.floor(Math.random() * 2)
        ].username

      if (room.game.turn === `ai`) {
        room.game.state = [
          ...room.game.state,
          room.users.filter(x => x.username === `ai`)[0].type === `weak`
          ? randomMove(
              room.game.state[room.game.state.length - 1],
              room.game.state.length
            )
          : perfectMove(room.game)
        ]

        room.game.turn = username
      }

      room.messages = [
        ...room.messages,
        {
          id: room.id,
          message: `The game has started!`,
          time: +new Date(),
          username: `zen-games`,
        }
      ]

      console.log(chalk.green(
        `${room.game.name} in ${room.id} has started!`
      ))
    }

    rooms = [
      ...rooms.filter(x => x.id !== id),
      room
    ]

    io.emit(`api:updateRooms`, { rooms })

    setRooms({ rooms })
  })
}
