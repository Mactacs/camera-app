import React, {useState,useEffect} from 'react';
import { SafeAreaView,StyleSheet,View,StatusBar, FlatList, TouchableOpacity } from 'react-native'
import FastImage from 'react-native-fast-image'
const RNFS = require('react-native-fs')

import { PACKAGE_NAME } from '../utils/Constants'

const GalleryFragment = ({route,navigation}) => {

    const [dataSource,setDataSource] = useState([])
    const [numColumns, setNumColumns] = useState(3)

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
                    return RNFS.readFile(statResult[1], 'utf8');
                }
            
                return 'no file';
            })
            .catch((err) => {
                console.log(err.message, err.code);
            });
        }, []
    );


    const formatData = (data,numColumns) => {
        const numberOfFullrows = Math.floor(data.length / numColumns);

        let numberOfElementsLastRow = data.length - (numberOfFullrows * numColumns);
        while(numberOfElementsLastRow !== numColumns && numberOfElementsLastRow !== 0) {
            data.push({id: -1, src: ''});
            numberOfElementsLastRow = numberOfElementsLastRow + 1;
        }
        return data
    }


    const renderImage = React.useCallback(
        ({item}) => {
            if(item.id == -1) {
                return (
                    <View style={[{backgroundColor:'transparent'},styles.imageContainerStyle]}/>
                )
            }
            return (
                <View style={styles.imageContainerStyle}>
                    <TouchableOpacity style={{flex: 1}} onPress={() => navigation.navigate('ImagePreview',item)}>
                        <FastImage style={styles.imageStyle} source={{uri : item.src}}/>
                    </TouchableOpacity>
                 </View>
            )
        }
    )


    return (
        <SafeAreaView style={styles.container} onLayout={(event) => {
            const {width} = event.nativeEvent.layout
            const itemWidth = 100
            const numColumns = Math.floor(width/itemWidth)
            setNumColumns(numColumns)
        }}>
            <StatusBar translucent backgroundColor="transparent" barStyle="dark-content"/>
            <FlatList
                data={formatData(dataSource,numColumns)}
                renderItem={renderImage}
                numColumns={numColumns}
                key={numColumns}
                keyExtractor={(item,index) => index.toString()}/>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container : {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    imageContainerStyle : {
        flex: 1,
        flexDirection: 'column',
        alignContent:'center',
        alignItems: 'center',
        margin: 1,
    },
    imageStyle: {
        height: 100,
        width: 100
    }
})

export default GalleryFragment;