import React, { Component } from 'react'
import { StyleSheet, View, TouchableOpacity, StatusBar, TouchableHighlight, PermissionsAndroid, Platform} from 'react-native'
// import { createDrawerNavigator } from '@react-navigation/drawer'
import { RNCamera } from 'react-native-camera'
import MaterialIcon from 'react-native-vector-icons/dist/MaterialIcons'
import IonIcon from 'react-native-vector-icons/dist/Ionicons'

import { PACKAGE_NAME } from '../utils/Constants'
const RNFS = require('react-native-fs')


class CameraFragment extends Component {
  state = {
    cameraType : 'back',
    flash : false,
    touchableHighlightMouseDownCamera : false,
    touchableHighlightMouseDownSettings : false
  }
  render() {
    return (
      <View style={styles.container}>
          <StatusBar translucent backgroundColor="transparent" barStyle="light-content"/>
          <RNCamera
            style={{ flex: 1, alignItems: 'center' }}
            flashMode={this.state.flash ? RNCamera.Constants.FlashMode.on : RNCamera.Constants.FlashMode.off}
            autoFocus={RNCamera.Constants.AutoFocus.on}
            ref={ref => {
              this.camera = ref
            }}
            type={this.state.cameraType}
            captureAudio={false}
            androidCameraPermissionOptions={{
              title: 'Permission to use camera',
              message : 'We need your permission to use your camera',
              buttonPositive: 'Ok',
              buttonNegative: 'Cancel'
            }}
          >
            <View style={styles.settingsIconContainer}>
              <TouchableHighlight
                  underlayColor={'transparent'}
                  onPress={()=>{ 
                    if(this.state.flash) {
                      this.setState({flash:false})
                    } else {
                      this.setState({flash:true})
                    }
                  }}>
                    <IonIcon name={this.state.flash?'ios-flash':'ios-flash-off'} size={35} color={'white'} style={{marginEnd:15,marginTop:10}}/>
              </TouchableHighlight>
              <TouchableHighlight
                  underlayColor={'transparent'}
                  onPress={ console.log("") }
                  onShowUnderlay={()=>this.setState({touchableHighlightMouseDownSettings:true})}
                  onHideUnderlay={()=>this.setState({touchableHighlightMouseDownSettings:false})} >
                    <IonIcon name={'settings-sharp'} size={35} color={this.state.touchableHighlightMouseDownSettings?'#e8e8e8':'white' } style={{marginEnd:15,marginTop:10}}/>
              </TouchableHighlight>
            </View>

            <View style={styles.bottomContainer}>
              <TouchableHighlight
                underlayColor={'transparent'}
                onPress={()=>{
                  if(this.state.cameraType === 'back') {
                    this.setState({cameraType:'front'})
                  } else {
                    this.setState({cameraType:'back'}) 
                  }
                }}
                onShowUnderlay={()=>this.setState({touchableHighlightMouseDownCamera:true})}
                onHideUnderlay={()=>this.setState({touchableHighlightMouseDownCamera:false})} >
                <MaterialIcon name={'flip-camera-ios'} size={60} color={this.state.touchableHighlightMouseDownCamera?'#e8e8e8':'white' }/> 
              </TouchableHighlight>
              
              <View style={styles.captureButtonBorder}>
                <TouchableOpacity style={styles.captureButton} onPress={this.takePicture.bind(this)}/>
              </View>

              <View style={styles.galleryButtonBorder}>
                <TouchableOpacity style={styles.galleryButton} onPress={() => this.props.navigation.navigate('Gallery') }/>
              </View>
            </View>
          </RNCamera>
      </View>
    )
  }

  takePicture = async () => {
    if (this.camera) {
      if(Platform.OS === 'android') {
        try {
          const granted = await PermissionsAndroid.requestMultiple([
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          ]);
        } catch (err) {
          console.warn(err);
        }
        const readGranted = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE); 
        const writeGranted = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);
        if(!readGranted || !writeGranted) {
          console.log('Read and write permissions have not been granted');
          return;
        }
        var path = `${RNFS.ExternalStorageDirectoryPath}/Android/media/${PACKAGE_NAME}/images/`;
        RNFS.mkdir(path)

        var today = new Date();
        var fileName = today.getFullYear() + "-" + today.getMonth() + "-" + today.getDate() + "-" + today.getHours() + "-" + today.getMinutes() + "-" + today.getSeconds() + ".jpg"
        var absolutePath = path + fileName

        const options = { path: absolutePath, quality: 1, base64: true };
        const data = await this.camera.takePictureAsync(options);

        console.log(data.uri)

      } else if(Platform.OS === 'ios') {
        // Future release
      }

      // console.log(data.uri);
    }
  };
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

export default CameraFragment