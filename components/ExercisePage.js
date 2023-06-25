import React, { useState } from "react";
import {
  View,
  Text,
  LayoutAnimation,
  StyleSheet,
  UIManager,
  Platform,
  ScrollView
} from "react-native";
import { TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import CheckBox from '@react-native-community/checkbox';

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const Accordion = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(value => !value);
    // buggy, makes children transparent when tapped on repeatedly quickly.
    // LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
  }

  return (
    <>
      <TouchableOpacity onPress={toggleOpen} style={styles.heading} activeOpacity={0.6}>
        {title}
        <Icon name={isOpen ? "chevron-up-circle" : "chevron-down-circle"} size={18} color="black" />
      </TouchableOpacity>
      <View style={[styles.list, !isOpen ? styles.hidden : undefined]}>
        {children}
      </View>
    </>
  );
};

const ExercisePage = ( {ExerciseTM, exercises, setExercises} ) => {
  // const ExerciseTM = route.params.TM
  const [pageExercises, setPageExercises] = useState(exercises)
  
  const setExercisesHelper = (newExercises) => {
    setPageExercises(newExercises)
    setExercises(newExercises)
  }

  const getTitle = (exercise) => {
    return (
      <View>
        <Text style={styles.sectionTitle}>{exercise.exerciseName}</Text>
        {/* <Text style={styles.sectionDescription} >{exercise.type}</Text> */}
      </View>
    )
  }

  const repOrReps = (number) => {
    if (number == 1) {
      return 'rep'
    }
    return 'reps'
  }

  const getBody = (exercise) => {
    return (
      exercise.type === 'main' ?
        <View>
          {exercise.percentages.map((item, index) => {
            const currentWeight = 2.5 * Math.ceil(item * ExerciseTM / 2.5)
            return (
              <View key={index} style={styles.exerciseRow}>
                <Text key={index} style={styles.sectionTitle}>{currentWeight} kg x {exercise.reps[index]} {repOrReps(exercise.reps[index])}</Text>
                <CheckBox
                  style={{ transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }] }}
                  value={exercise.checked[index]}
                  onValueChange={(newValue) => {
                    const exerciseIndex = exercises.findIndex(obj => obj.id === exercise.id);
                    const newState = exercises
                    newState[exerciseIndex].checked[index] = newValue
                    setExercisesHelper([...newState])
                    // console.log(exercises)
                  }}
                  tintColors={{ true: '#291D89', false: 'black' }} />
              </View>
            )
          })}
        </View> :
        <View>
          {exercise.reps.map((item, index) => {
            return (
              <View key={index} style={styles.exerciseRow}>
                <Text style={styles.sectionTitle}>{item} reps</Text>
                <CheckBox
                  style={{ transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }] }}
                  value={exercise.checked[index]}
                  onValueChange={(newValue) => {
                    const exerciseIndex = exercises.findIndex(obj => obj.id === exercise.id);
                    const newState = exercises
                    newState[exerciseIndex].checked[index] = newValue
                    setExercisesHelper([...newState])
                    // console.log(exercises)
                  }}
                  tintColors={{ true: '#291D89', false: 'black' }} />
              </View>
            )
          })}
        </View>
    )
  }

  return (
    // <SafeAreaProvider>
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} contentContainerStyle={{ flexGrow: 1, paddingBottom: 0 }}>
        {pageExercises.map((item, index) => {
          // console.log("item: ", item)
          // console.log("index: ", index)
          return (<View key={item.id} style={styles.exerciseCard}>
            <Accordion title={getTitle(item)}>{getBody(item)}</Accordion>
            <View style={{ alignItems: 'center' }} ><View style={styles.divider} /></View>
          </View>)
        })}
      </ScrollView>
    </SafeAreaView>
    // </SafeAreaProvider>
  );
};

export default ExercisePage;

const styles = StyleSheet.create({
  container: {
    // paddingHorizontal: 15,
    // paddingVertical: 30,
    flex: 1,
    // borderWidth: 3,
  },
  text: {
    fontSize: 18,
    marginBottom: 20,
    color: 'black',
  },
  safeArea: {
    flex: 1,
    backgroundColor: 'white',
  },
  heading: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  exerciseRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    marginRight: '10%',
  },
  hidden: {
    height: 0,
  },
  list: {
    overflow: 'hidden'
  },
  sectionTitle: {
    fontSize: 16,
    height: 30,
    marginLeft: '5%',
    color: 'black',
  },
  sectionDescription: {
    fontSize: 12,
    height: 30,
    marginLeft: '5%',
    color: 'black',
  },
  divider: {
    borderBottomColor: 'grey',
    borderBottomWidth: StyleSheet.hairlineWidth,
    width: '100%',
  },
  exerciseCard: {
    padding: 15,
  }
});

