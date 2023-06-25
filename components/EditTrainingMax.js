import React, { useEffect, useState } from 'react'
import { View, Text, DeviceEventEmitter, TextInput, StyleSheet, TouchableOpacity, KeyboardAvoidingView } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const EditTrainingMax = ({ route, navigation }) => {
  const [tempSquat, setTempSquat] = useState(Number(route.params.SquatTM))
  const [tempBench, setTempBench] = useState(Number(route.params.BenchPressTM))
  const [tempDeadlift, setTempDeadlift] = useState(Number(route.params.DeadliftTM))
  const [tempOverheadPress, setTempOverheadPress] = useState(Number(route.params.OverheadPressTM))

  const initialValues = {
    SquatTM: route.params.SquatTM,
    BenchPressTM: route.params.BenchPressTM,
    DeadliftTM: route.params.DeadliftTM,
    OverheadPressTM: route.params.OverheadPressTM,
  }

  const addSquatTM = () => {
    const temp = tempSquat + 1
    setTempSquat(tempSquat + 1)
    DeviceEventEmitter.emit('event.editTrainingMax', temp);
  }

  const setNewTMs = () => {
    var newSquat = tempSquat
    var newBench = tempBench
    var newDeadlift = tempDeadlift
    var newOHP = tempOverheadPress
    if (!(/^-?[\d]*(\.[\d]+)?$/g).test(newSquat)) {
      newSquat = Number(initialValues.SquatTM)
    }
    if (!(/^-?[\d]*(\.[\d]+)?$/g).test(newBench)) {
      newBench = Number(initialValues.BenchPressTM)
    }
    if (!(/^-?[\d]*(\.[\d]+)?$/g).test(newDeadlift)) {
      newDeadlift = Number(initialValues.DeadliftTM)
    }
    if (!(/^-?[\d]*(\.[\d]+)?$/g).test(newOHP)) {
      newOHP = Number(initialValues.OverheadPressTM)
    }
    const newTMs = {
      newSquatTM: newSquat,
      newBenchPressTM: newBench,
      newDeadliftTM: newDeadlift,
      newOverheadPressTM: newOHP
    }
    DeviceEventEmitter.emit('event.editTrainingMax', newTMs);
  }

  useEffect(() => {

    return () => {
      console.log("Listener Removed!")
      DeviceEventEmitter.removeAllListeners('event.editTrainingMax');
    };

  }, []);

  const resetTMs = () => {
    setTempSquat(Number(initialValues.SquatTM))
    setTempBench(Number(initialValues.BenchPressTM))
    setTempDeadlift(Number(initialValues.DeadliftTM))
    setTempOverheadPress(Number(initialValues.OverheadPressTM))
  }

  const onSquatTextChanged = (value) => {
    // code to remove non-numeric characters from text
    setTempSquat(value.replace(/[^0-9.]/g, ''))
  }

  const onBenchPressTextChanged = (value) => {
    // code to remove non-numeric characters from text
    setTempBench(value.replace(/[^0-9.]/g, ''))
  }

  const onOHPTextChanged = (value) => {
    // code to remove non-numeric characters from text
    setTempOverheadPress(value.replace(/[^0-9.]/g, ''))
  }

  const onDeadliftTextChanged = (value) => {
    // code to remove non-numeric characters from text
    setTempDeadlift(value.replace(/[^0-9.]/g, ''))
  }

  /* <Button title="+1 to squat" onPress={() => addSquatTM()}></Button> */

  return (
    <KeyboardAwareScrollView enableAutomaticScroll={true} scrollEnabled={true} enableOnAndroid={true} extraHeight={20} extraScrollHeight={20} style={styles.container} contentContainerStyle={styles.container}>
      <View style={styles.exerciseViewWrapper}>
        <View style={styles.exerciseView}>
          <Text style={styles.text}>Squat</Text>
          <TextInput maxLength={6} style={styles.textInput}
            onChangeText={value => onSquatTextChanged(value)}
            value={tempSquat + ''} keyboardType='numeric' />
        </View>

        <View style={styles.exerciseView}>
          <Text style={styles.text}>Bench Press</Text>
          <TextInput maxLength={6} style={styles.textInput}
            onChangeText={value => onBenchPressTextChanged(value)}
            value={tempBench + ''} keyboardType='numeric' />
        </View>

        <View style={styles.exerciseView}>
          <Text style={styles.text}>Deadlift</Text>
          <TextInput maxLength={6} style={styles.textInput}
            onChangeText={value => onDeadliftTextChanged(value)}
            value={tempDeadlift + ''} keyboardType='numeric' />
        </View>

        <View style={styles.exerciseView}>
          <Text style={styles.text}>Overhead Press</Text>
          <TextInput maxLength={6} style={styles.textInput}
            onChangeText={value => onOHPTextChanged(value)}
            value={tempOverheadPress + ''} keyboardType='numeric' />
        </View>
      </View>

      <View style={styles.bottomContainer}>
        <View style={styles.rowOfButtons}>
          <TouchableOpacity style={styles.smallButton} onPress={() => resetTMs()}>
            <Text style={styles.buttonText}>Reset Training Max</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.smallButton} onPress={() => {
            setNewTMs();
            navigation.navigate("Home");
          }}>
            <Text style={styles.buttonText}>Set Training Max</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAwareScrollView>
  )
}

const styles = StyleSheet.create({
  text: {
    margin: 10,
    color: 'black',
    fontSize: 13.5,
  },

  textInput: {
    borderColor: 'grey',
    borderWidth: 1,
    margin: 10,
    width: '30%',
    alignSelf: 'center',
    textAlign: 'center',
    color: 'black',
    fontSize: 13.5
  },

  // textInputOHP: {
  //   borderColor: 'grey',
  //   borderWidth: 1,
  //   margin: 10,
  //   width: '30%',
  //   alignSelf: 'center',
  //   textAlign: 'center',
  // },

  exerciseViewWrapper: {
    padding: 10,
  },

  exerciseView: {
    alignItems: 'center',
    borderWidth: 1,
    margin: 10,
    borderRadius: 10,
    backgroundColor: '#F0F4FF'
  },

  container: {
    flexGrow: 1,
    backgroundColor: 'white',
  },

  rowOfButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'center',
  },

  bottomContainer: {
    justifyContent: 'flex-end',
    flex: 1,
    marginBottom: 20,
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
    textAlign: 'center',
    fontSize: 13.5,
  },
})

export default EditTrainingMax