import React, { useContext } from 'react'
import { TouchableOpacity, View } from 'react-native'
import { ThemeContext, Text } from '..'

type Props = {
  children: React.ReactNode
  showRibbon: boolean
  onClose: () => void
}

const Ribbon: React.FC<Props> = ({ showRibbon, children, onClose }) => {
  const [theme] = useContext(ThemeContext)

  return (
    <View
      style={{
        ...theme.styles.shadow,
        display: showRibbon ? 'flex' : 'none',
        position: 'absolute',
        marginLeft: 'auto',
        marginRight: 'auto',
        flexDirection: 'row',
        top: 15,
        left: 0,
        right: 0,
        width: '50%',
        zIndex: 1000,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.primaryColor,
        borderRadius: 10,
      }}
    >
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
        }}
      >
        {children}
        <TouchableOpacity
          style={{
            //display: 'flex',
            //justifyContent: 'center',
            position: 'absolute',
            right: 15,
          }}
          onPress={onClose}
        >
          <Text style={{ color: 'white', fontWeight: 'bold' }}>X</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Ribbon
