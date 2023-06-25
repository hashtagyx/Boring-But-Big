import React, { useState } from 'react'
import { View, StyleSheet, TouchableOpacity, Text, DeviceEventEmitter } from 'react-native'

const RowOfButtons = ( {BeginNextWeek, navigation, SquatTM, BenchPressTM, OverheadPressTM, DeadliftTM, setSquatTM, setBenchPressTM, setOverheadPressTM, setDeadliftTM} ) => {
    const editTrainingMaxOnPress = () => {
        DeviceEventEmitter.addListener('event.editTrainingMax', newTMs => {
            //action that need to be performed
            setSquatTM(newTMs.newSquatTM)
            setBenchPressTM(newTMs.newBenchPressTM)
            setOverheadPressTM(newTMs.newOverheadPressTM)
            setDeadliftTM(newTMs.newDeadliftTM)
        }); 
        console.log('Listener Added!')
        navigation.navigate('Edit Training Max', {
            SquatTM: SquatTM,
            BenchPressTM: BenchPressTM,
            OverheadPressTM: OverheadPressTM,
            DeadliftTM: DeadliftTM,
        })
    }

    return (
        <View style={styles.rowOfButtons}>
            <TouchableOpacity style={styles.smallButton} onPress={() => editTrainingMaxOnPress()}>
                <Text style={styles.buttonText}>Edit Training Max</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.smallButton} onPress={() => BeginNextWeek()}>
                <Text style={styles.buttonText}>Begin Next Week</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    rowOfButtons: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignSelf: 'center',
    },

    smallButton: {
        margin: 5,
        padding: 20,
        borderRadius: 5,
        backgroundColor: '#291D89',
        justifyContent: 'center',
        width: '46%',
        borderWidth: 1,
        borderColor: 'black',
    },

    buttonText: {
        color: 'white',
        alignSelf: 'center',
        fontSize: 14,
    },
})

export default RowOfButtons