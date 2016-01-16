import chalk from 'chalk'
import { getRooms, setRooms } from '../state/rooms'

export default ({
  io, socket
}) => {
  socket.on(`ui:setGame`, ({ game, id }) => {
    let rooms = getRooms()

    let room = rooms.filter(x => x.id === id)[0]

    room.game = {
      ...game,
      started: false,
      turn: null,
      winner: null
    }

    rooms = [
      ...rooms.filter(x => x.id !== id),
      room
    ]

    io.emit(`api:updateRooms`, { rooms })

    console.log(chalk.white(
      `Room ${id} is now playing ${game.name}.`
    ))

    setRooms({ rooms })
  })
}
