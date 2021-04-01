import React  from 'react'

import { View, Text } from 'react-native'
import {Container} from "native-base";

export const DevicesScreen = () => {

  return (
    <Container style={{
      flex: 1,
    }}>
      <View>
        <Text>DevicesScreen</Text>
      </View>
    </Container>
  )
}
DevicesScreen.navigationOptions = {
  headerTitle: 'Devices Screen'
}
