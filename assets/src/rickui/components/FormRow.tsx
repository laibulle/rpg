import React from 'react'

import Spacing from './Spacing'

type Props = { children: React.ReactNode }

const CustomTextInput: React.FC<Props> = ({ children }) => {
  return (
    <>
      <Spacing spacings="mt-3" />
      {children}
    </>
  )
}

export default CustomTextInput
