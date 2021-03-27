import React from 'react';
import { StyleSheet,View,StatusBar,Text } from 'react-native'

const FormFragment = () => {
    return (
        <View style={styles.container}>
          <StatusBar translucent backgroundColor="transparent" barStyle="dark-content"/>
            <Text>ABCDEFG</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container : {
        flex  : 1,
        flexDirection: 'column'
    }
})

export default FormFragment;