import React,{FC} from 'react'
import { View } from 'react-native'

interface Props {
  iconStyle?: any;
  name?: any;
}

const CustomIcon: FC<Props> = ({
  iconStyle,
  name:Name
}) => {
  return (
    <View
      style={{
        marginRight: -20,
        alignContent: 'center',
        width: '10%',
        display: 'flex',
      }}
    >
      {Name && (
        <Name height={iconStyle.height} width={iconStyle.width} />
      )}
    </View>
  )
}

export default CustomIcon
