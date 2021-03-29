import React, {useState,useEffect} from 'react';
import { SafeAreaView,StyleSheet,View,StatusBar } from 'react-native'
import FastImage from 'react-native-fast-image'
// const RNFS = require('react-native-fs')

// import { PACKAGE_NAME } from '../utils/Constants'

const ImagePreviewFragment = ({route,navigation}) => {

    const { id,src } = route.params;

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar translucent backgroundColor="transparent" barStyle="dark-content"/>
            <FastImage style={styles.imageStyle} source={{uri: src}} />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container : {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    imageStyle: {
        resizeMode: 'contain',
        flex: 1,
        aspectRatio: 1
    },
})

export default ImagePreviewFragment;