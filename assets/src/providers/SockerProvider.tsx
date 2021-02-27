import { isDev } from '../helpers'
import { Socket } from 'phoenix'
import React from 'react'

const socket = new Socket((isDev() ? 'ws://localhost:4000/' : '/') + 'socket', {
  params: {},
})

export const SocketContext = React.createContext(socket as Socket)
