import React, { Component } from 'react'
import { StyleSheet, View, TouchableOpacity, StatusBar, TouchableHighlight} from 'react-native'
import { RNCamera } from 'react-native-camera'
import MaterialIcon from 'react-native-vector-icons/dist/MaterialIcons'
import IonIcon from 'react-native-vector-icons/dist/Ionicons'

class App extends Component {
  state = {
    touchableHighlightMouseDownCamera : false,
    touchableHighlightMouseDownSettings : false
  }
  render() {
    return (
      <View style={styles.container}>
          <StatusBar translucent backgroundColor="transparent"/>
          <RNCamera
            style={{ flex: 1, alignItems: 'center' }}
            autoFocus={RNCamera.Constants.AutoFocus.on}
            ref={ref => {
              this.camera = ref
            }}
            captureAudio={false}
          >
            <View style={styles.settingsIconContainer}>
              <TouchableHighlight
                  underlayColor={'transparent'}
                  onPress={()=>{console.log("pressed");}}
                  onShowUnderlay={()=>this.setState({touchableHighlightMouseDownSettings:true})}
                  onHideUnderlay={()=>this.setState({touchableHighlightMouseDownSettings:false})} >
                    <IonIcon name={'settings-sharp'} size={35} color={this.state.touchableHighlightMouseDownSettings?'#e8e8e8':'white' } style={{marginEnd:15,marginTop:10}}/>
              </TouchableHighlight>
            </View>

            <View style={styles.bottomContainer}>
              <TouchableHighlight
                underlayColor={'transparent'}
                onPress={()=>{console.log("pressed");}}
                onShowUnderlay={()=>this.setState({touchableHighlightMouseDownCamera:true})}
                onHideUnderlay={()=>this.setState({touchableHighlightMouseDownCamera:false})} >
                <MaterialIcon name={'flip-camera-ios'} size={60} color={this.state.touchableHighlightMouseDownCamera?'#e8e8e8':'white' }/> 
              </TouchableHighlight>
              
              <View style={styles.captureButtonBorder}>
                <TouchableOpacity style={styles.captureButton}/>
              </View>

              <View style={styles.galleryButtonBorder}>
                <TouchableOpacity style={styles.galleryButton}/>
              </View>
            </View>
          </RNCamera>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black'
  },
  bottomContainer: {
    width: '100%',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    marginVertical: 30
  },
  settingsIconContainer: {
    width: '100%',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-end',
    position: 'absolute',
    marginTop: 36,
  },
  captureButton: {
    width: 80,
    height: 80,
    alignItems: 'center',
    borderRadius: 80,
    backgroundColor: '#77c7fc'
  },
  captureButtonBorder : {
    width: 95,
    height: 95,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 95,
    backgroundColor: 'white'
  },
  galleryButton: {
    width: 50,
    height: 50,
    alignItems: 'center',
    borderRadius: 50,
    backgroundColor: '#77c7fc'
  },
  galleryButtonBorder: {
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 60,
    backgroundColor: 'white'
  }
})

export default App