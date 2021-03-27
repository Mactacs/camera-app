import React from 'react';
import { StyleSheet,View,StatusBar,Text,Image } from 'react-native'
const RNFS = require('react-native-fs')

import { PACKAGE_NAME } from '../utils/Constants'

const GalleryFragment = () => {

    RNFS.readDir(`${RNFS.ExternalStorageDirectoryPath}/Android/media/${PACKAGE_NAME}/images/`)
        .then((result) => {
            console.log("GOT RESULT : ",result)
            return Promise.all([RNFS.stat(result[0].path), result[0].path]);
        })
        .then((result) => {
            if (statResult[0].isFile()) {
                // if we have a file, read it
                return RNFS.readFile(statResult[1], 'utf8');
            }
        
            return 'no file';
        })
        .then((contents) => {
            // log the file contents
            console.log(contents);
        })
        .catch((err) => {
            console.log(err.message, err.code);
        });
    return (
        <View style={styles.container}>
          <StatusBar translucent backgroundColor="transparent" barStyle="dark-content"/>
            <Image style={{width: 100, height: 100}} source={{uri: "file://" + RNFS.ExternalStorageDirectoryPath + "/Android/media/com.cameraapp/images/2021-2-27-11-49-32.jpg"}} />
        </View>
    )
}

const styles = StyleSheet.create({
    container : {
        flex  : 1,
        flexDirection: 'column'
    }
})

export default GalleryFragment;