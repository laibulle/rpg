import React from 'react'
import { H2 } from '../rickui'
import Layout from '../Layout'

type Props = { lobby: string }

const Waiting: React.FunctionComponent<Props> = ({ lobby }) => {
  return (
    <Layout image={require('../../assets/waiting.gif')}>
      <H2>Waiting for other player to join lobby {lobby}</H2>
    </Layout>
  )
}

export default Waiting
