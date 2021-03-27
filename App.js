import React from 'react'
import { StyleSheet, StatusBar} from 'react-native'
import {
  NavigationContainer
} from '@react-navigation/native'
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack'

import CameraFragment from './src/ui/CameraFragment'
import GalleryFragment from './src/ui/GalleryFragment'
import FormFragment from './src/ui/FormFragment'

const Main = createStackNavigator()

const App = () => {

  return (
    <NavigationContainer>
      <Main.Navigator initialRouteName='Camera' screenOptions={{cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS}}>
        <Main.Screen name="Camera" component={CameraFragment} options={{headerShown:false}}/>
        <Main.Screen name="Gallery" component={GalleryFragment} options={{title:"Gallery"}}/>
        <Main.Screen name="Form" component={FormFragment} options={{title:"Options"}}/>
      </Main.Navigator>
    </NavigationContainer>
  )

}


export default App