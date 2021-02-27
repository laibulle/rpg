import React, { useContext } from 'react'
import { useTranslation } from 'react-i18next'

import { H2, Padding5, Spacing, ThemeContext } from '../rickui'
import Layout from '../Layout'

type Props = { lobby: string }

const Waiting: React.FunctionComponent<Props> = ({ lobby }) => {
  const [t] = useTranslation()
  const [theme] = useContext(ThemeContext)
  return (
    <Layout image={require('../../assets/waiting.gif')}>
      <Spacing
        spacings={Padding5}
        style={{ justifyContent: 'center', alignItems: 'center' }}
      >
        <H2 style={{ textAlign: 'center' }}>{t('waitingLobby')}</H2>
        <H2
          style={{
            textAlign: 'center',
            color: theme.primaryColor,
          }}
        >
          {`🔫 ${lobby} 🔫`}
        </H2>
      </Spacing>
    </Layout>
  )
}

export default Waiting
