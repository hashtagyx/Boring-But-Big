import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'

const TrainingMaxes = ({ week, SquatTM, BenchPressTM, DeadliftTM, OverheadPressTM }) => {
    const [weekText, setWeekText] = useState(week);

    useEffect(() => {
        if (week === 7) {
            setWeekText(week + ' (Deload Week)')
        } else {
            setWeekText(week)
        }
    }, [week])

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Week {weekText} Training Maxes:</Text>
            <View style={styles.rowOfTMs}>
                <View style={styles.trainingMaxBox}>
                    <Text style={styles.text}>Squat</Text>
                    <View style={styles.weightContainer}>
                        <Text style={styles.text}>{SquatTM} kg</Text>
                    </View>
                </View>
                <View style={styles.trainingMaxBox}>
                    <Text style={styles.text}>Bench Press</Text>
                    <View style={styles.weightContainer}>
                        <Text style={styles.text}>{BenchPressTM} kg</Text>
                    </View>
                </View>
                <View style={styles.trainingMaxBox}>
                    <Text style={styles.text}>Deadlift</Text>
                    <View style={styles.weightContainer}>
                        <Text style={styles.text}>{DeadliftTM} kg</Text>
                    </View>
                </View>
                <View style={styles.trainingMaxBox}>
                    <Text style={styles.text}>Overhead Press</Text>
                    <View style={styles.weightContainer}>
                        <Text style={styles.text}>{OverheadPressTM} kg</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    trainingMaxBox: {
        margin: 10,
        alignItems: 'center',
        borderWidth: 1,
        padding: 5,
        width: '20%',
        flex: 1,
        justifyContent: 'center',
        borderRadius: 5,
        backgroundColor: '#F0F4FF'
    },

    weightContainer: {
        marginTop: 'auto'
    },

    container: {
        flex: 1,
        justifyContent: 'flex-start',
        backgroundColor: 'white',
        marginTop: 10,
    },

    text: {
        color: 'black',
        alignSelf: 'center',
        textAlign: 'center',
        fontSize: 13.5,
    },

    rowOfTMs: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignSelf: 'center',
    },

    weekText: {
        alignSelf: 'center',
        color: 'black',
    }
})

export default TrainingMaxes