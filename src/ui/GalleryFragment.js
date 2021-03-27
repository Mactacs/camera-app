import React, {useState,useEffect} from 'react';
import { SafeAreaView,StyleSheet,View,StatusBar, FlatList, TouchableOpacity } from 'react-native'
import FastImage from 'react-native-fast-image'
const RNFS = require('react-native-fs')

import { PACKAGE_NAME } from '../utils/Constants'

const GalleryFragment = () => {

    const [dataSource,setDataSource] = useState([])

    useEffect(() => {
        RNFS.readDir(`${RNFS.ExternalStorageDirectoryPath}/Android/media/${PACKAGE_NAME}/images/`)
            .then((result) => {
                let items = []
                result.forEach(function (arrayItem,index) {
                    let newObject = {id: index, src: "file://" + arrayItem.path}
                    items.push(newObject)
                })
                setDataSource(items);
                return Promise.all([RNFS.stat(result[0].path), result[0].path]);
            })
            .then((result) => {
                if (statResult[0].isFile()) {
                    // if we have a file, read it
                    return RNFS.readFile(statResult[1], 'utf8');
                }
            
                return 'no file';
            })
            .catch((err) => {
                console.log(err.message, err.code);
            });
      }, []);

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar translucent backgroundColor="transparent" barStyle="dark-content"/>
            <FlatList
                data={dataSource}
                renderItem={({item}) => (
                    <View style={styles.imageContainerStyle}>
                        <TouchableOpacity style={{flex: 1}}>
                            <FastImage style={styles.imageStyle} source={{uri : item.src}}/>
                        </TouchableOpacity>
                    </View>
                )}
                numColumns={3}
                keyExtractor={(item,index) => index.toString()}/>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container : {
        flex: 1,
        backgroundColor: '#ffffff'
    },
    imageContainerStyle : {
        flex: 1,
        flexDirection: 'column',
        margin: 1,
    },
    imageStyle: {
        height: 120,
        width: 120
    }
})

export default GalleryFragment;