import React, { useState, useEffect } from 'react'
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native'
import CheckBox from '@react-native-community/checkbox';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ExerciseButton = ({ navigation, exerciseName, onButtonPress, checked, setItemString, setButtonState }) => {
    const [toggleCheckBox, setToggleCheckBox] = useState(checked)

    useEffect(() => {
        setToggleCheckBox(checked)
        setButtonState(checked)
    }, [checked])

    // useEffect(() => {
    //     onPressCheckBox(false)
    // }, [uncheck])

    const onPressCheckBox = (value) => {
        setToggleCheckBox(value)
        setButtonState(value)
        storeData(setItemString, value)
    }


    const storeData = async (key, value) => {
        try {
            const jsonValue = JSON.stringify(value)
            await AsyncStorage.setItem(key, jsonValue)
        } catch (e) {
            // saving error
            console.log(e)
        }
    }

    /*
    useEffect(() => {
        AsyncStorage.getAllKeys((err, keys) => {
            AsyncStorage.multiGet(keys, (error, stores) => {
                stores.map((result, i, store) => {
                    console.log({ [store[i][0]]: store[i][1] });
                    return true;
                });
            });
        });
    });*/

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={() => onButtonPress()}>
                <Text style={styles.text}>{exerciseName}</Text>
                <CheckBox
                    style={{ transform: [{ scaleX: 1.8 }, { scaleY: 1.8 }] }}
                    value={toggleCheckBox}
                    onValueChange={(newValue) => onPressCheckBox(newValue)}
                    tintColors={{ true: '#291D89', false: 'black' }} />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    button: {
        marginHorizontal: 15,
        padding: 30,
        borderRadius: 10,
        backgroundColor: '#F0F4FF',
        justifyContent: 'space-between',
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: 'black'
    },

    text: {
        color: 'black',
        alignSelf: 'center',
        fontSize: 20,
    },

    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'white',
        marginTop: 10,
    },
})

export default ExerciseButton