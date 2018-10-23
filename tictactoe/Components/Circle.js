import React from 'react';
import {View, StyleSheet} from 'react-native';
import { isAbsolute } from 'path';

export default function Circle (){
        return (
        <View style={styles.circle}></View>
        )
}

const styles = StyleSheet.create({
    circle: {
      backgroundColor: '#ff0000',
      width: 30,
      borderRadius: 15,
    }
});
