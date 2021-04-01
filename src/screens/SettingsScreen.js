import React  from 'react'

import { View, Text } from 'react-native'
import {Container} from "native-base";

export const SettingsScreen = ({navigation}) => {

  return (
    <Container style={{
      flex: 1,
    }}>
      <View>
        <Text>SettingsScreen</Text>
      </View>
    </Container>  )
}
