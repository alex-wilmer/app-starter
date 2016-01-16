import { getRooms, setRooms } from '../state/rooms'

export default ({
  io, socket
}) => {
  socket.on(`ui:sendMessage`, ({ id, message, username }) => {
    let rooms = getRooms()

    let room = rooms.filter(x => x.id === id)[0]

    room.messages = [
      ...room.messages,
      {
        message,
        time: +new Date(),
        username
      }
    ]

    rooms = [
      ...rooms.filter(x => x.id !== room.id),
      room
    ]

    io.emit(`api:updateRooms`, { rooms })

    setRooms({ rooms })
  })
}
