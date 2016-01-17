import React from 'react'

export default function test({
  asdasd,
  messages
}) {
  return (
    <div>
    { messages.map((message, index) =>
      <h2 key={index}>{message}</h2>
      )}
    </div>
  )
}
