import React from 'react';
import { SafeAreaView,StyleSheet,View,StatusBar, TouchableOpacity, Text } from 'react-native'
import FastImage from 'react-native-fast-image'
import FeatherIcon from 'react-native-vector-icons/Feather'
// const RNFS = require('react-native-fs')

// import { PACKAGE_NAME } from '../utils/Constants'

const ImagePreviewFragment = ({route,navigation}) => {

    const { id,src } = route.params;

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar translucent backgroundColor="transparent" barStyle="light-content"/>
            <FastImage style={styles.imageStyle} source={{uri: src}}>
                <View styles={styles.topBarContainer}>
                    <TouchableOpacity style={styles.backButtonStyle} onPress={() => navigation.pop()}>
                        <FeatherIcon name={'arrow-left'} size={28} color={'black'}/>
                    </TouchableOpacity>
                </View>
                {/* <TouchableOpacity style={styles.topBarContainer}>
                    <FeatherIcon name={'arrow-left'} size={35} color={'white'} style={{marginEnd:15,marginTop:10}}/>
                </TouchableOpacity> 
                <Text style={{color: 'red'}}>HELLO WORLD</Text> */}
            </FastImage>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container : {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    topBarContainer : {
        width: '100%',
        flex: 1,
        flexDirection: 'column',
        alignItems: 'flex-end',
        position: 'absolute',
        marginTop: 36,
    },
    backButtonStyle : {
        width: 40,
        height: 40,
        borderRadius : 20,
        marginTop: 40,
        marginStart: 20,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center'
    },
    imageStyle: {
        resizeMode: 'contain',
        flex: 1,
        aspectRatio: 1
    },
})

export default ImagePreviewFragment;