import React, {useState, useEffect} from 'react';
import {View, StyleSheet, DeviceEventEmitter} from 'react-native';
import TrainingMaxes from './TrainingMaxes';
import ExerciseButton from './ExerciseButton';
import RowOfButtons from './RowOfButtons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {FileSystem} from 'react-native-fs';
// import {benchExercisesWeek1DB, benchExercisesWeek2DB, benchExercisesWeek3DB, benchExercisesWeekDeloadDB} from '..\\data\\jsonFiles\\bench\\benchExercisesWeek1DB'
import benchExercisesWeek1DB from './benchExercisesWeek1DB.json'
import benchExercisesWeek2DB from './benchExercisesWeek2DB.json'
import benchExercisesWeek3DB from './benchExercisesWeek3DB.json'
import benchExercisesWeekDeloadDB from './benchExercisesWeekDeloadDB.json'
// C:\Users\cyx_9\WorkoutApp\data\jsonFiles\bench\benchExercisesWeek1DB.json
// import {squatExercisesWeek1DB, squatExercisesWeek2DB, squatExercisesWeek3DB, squatExercisesWeekDeloadDB} from '..\\data\\jsonFiles\\squat'
// data\jsonFiles\bench
// import {deadliftExercisesWeek1DB, deadliftExercisesWeek2DB, deadliftExercisesWeek3DB, deadliftExercisesWeekDeloadDB} from '..\\data\\jsonFiles\\deadlift'
const HomeScreen = ({navigation}) => {
  const BeginNextWeek = async () => {
    // uncheck this week's workouts
    // navigation.navigate('Edit Training Max')
    // increment week
    await storeExercises();
    setUncheck();
    var tempWeek = week;
    if (tempWeek === 7) {
      storeData('week', 1).then(setWeek(1));
    } else {
      storeData('week', tempWeek + 1).then(setWeek(tempWeek + 1));
    }
  };

  const getData = async key => {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      // error reading value
    }
  };

  const storeData = async (key, value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
    } catch (e) {
      // saving error
      console.log(e);
    }
  };

  useEffect(() => {
      AsyncStorage.getAllKeys((err, keys) => {
          AsyncStorage.multiGet(keys, (error, stores) => {
              stores.map((result, i, store) => {
                  console.log({ [store[i][0]]: store[i][1] });
                  return true;
              });
          });
      });
  });

  const [week, setWeek] = useState(1);
  const [SquatTM, setSquatTM] = useState(20);
  const [BenchPressTM, setBenchPressTM] = useState(20);
  const [DeadliftTM, setDeadliftTM] = useState(20);
  const [OverheadPressTM, setOverheadPressTM] = useState(20);
  const [squatExercises, setSquatExercises] = useState(null);
  const [benchExercises, setBenchExercises] = useState(null);
  const [deadliftExercises, setDeadliftExercises] = useState(null);
  const [OHPExercises, setOHPExercises] = useState(null);
  const [SquatCheck, setSquatCheck] = useState(false);
  const [BenchPressCheck, setBenchPressCheck] = useState(false);
  const [DeadliftCheck, setDeadliftCheck] = useState(false);
  const [OHPCheck, setOHPCheck] = useState(false);

  const isAsyncStoragePopulated = async () => {
    try {
      const value = await AsyncStorage.getItem('week');
      return value !== null; // Returns true if the key exists, false otherwise
    } catch (error) {
      console.log('Error reading from AsyncStorage:', error);
      return false; // Handle the error accordingly
    }
  };

  const populateAsyncStorage = async () => {
    try {
      // Set your initial values using AsyncStorage.setItem()
      await storeData('week', 1);
      await storeData('SquatCheck', false);
      await storeData('BenchPressCheck', false);
      await storeData('DeadliftCheck', false);
      await storeData('OHPCheck', false);
      await storeData('SquatTM', 20);
      await storeData('BenchPressTM', 20);
      await storeData('DeadliftTM', 20);
      await storeData('OverheadPressTM', 20);
      
      // const squatFilepath = '../data/jsonFiles/squat/'
      await storeLocalFileData('squatExercisesWeekDeloadDB', squatFilepath + 'squatExercisesWeekDeloadDB.json');
      await storeLocalFileData('squatExercisesWeek1DB.json', squatFilepath + 'squatExercisesWeek1DB.json');
      await storeLocalFileData('squatExercisesWeek2DB.json', squatFilepath + 'squatExercisesWeek2DB.json');
      await storeLocalFileData('squatExercisesWeek3DB.json', squatFilepath + 'squatExercisesWeek3DB.json');
      await storeLocalFileData('squatExercisesWeekDeload', squatFilepath + 'squatExercisesWeekDeloadDB.json');
      await storeLocalFileData('squatExercisesWeek1.json', squatFilepath + 'squatExercisesWeek1DB.json');
      await storeLocalFileData('squatExercisesWeek2.json', squatFilepath + 'squatExercisesWeek2DB.json');
      await storeLocalFileData('squatExercisesWeek3.json', squatFilepath + 'squatExercisesWeek3DB.json');

      // const benchFilepath = '../data/jsonFiles/bench/'
      await storeData('benchExercisesWeekDeloadDB', JSON.parse(benchExercisesWeekDeloadDB));
      await storeLocalFileData('benchExercisesWeek1DB', benchFilepath + 'benchExercisesWeek1DB.json');
      await storeLocalFileData('benchExercisesWeek2DB', benchFilepath + 'benchExercisesWeek2DB.json');
      await storeLocalFileData('benchExercisesWeek3DB', benchFilepath + 'benchExercisesWeek3DB.json');
      await storeLocalFileData('benchExercisesWeekDeload', benchFilepath + 'benchExercisesWeekDeloadDB.json');
      await storeLocalFileData('benchExercisesWeek1', benchFilepath + 'benchExercisesWeek1DB.json');
      await storeLocalFileData('benchExercisesWeek2', benchFilepath + 'benchExercisesWeek2DB.json');
      await storeLocalFileData('benchExercisesWeek3', benchFilepath + 'benchExercisesWeek3DB.json');

      // const deadliftFilepath = '../data/jsonFiles/deadlift/'
      await storeLocalFileData('deadliftExercisesWeekDeloadDB', deadliftFilepath + 'deadliftExercisesWeekDeloadDB.json');
      await storeLocalFileData('deadliftExercisesWeek1DB', deadliftFilepath + 'deadliftExercisesWeek1DB.json');
      await storeLocalFileData('deadliftExercisesWeek2DB', deadliftFilepath + 'deadliftExercisesWeek2DB.json');
      await storeLocalFileData('deadliftExercisesWeek3DB', deadliftFilepath + 'deadliftExercisesWeek3DB.json');
      await storeLocalFileData('deadliftExercisesWeekDeload', deadliftFilepath + 'deadliftExercisesWeekDeloadDB.json');
      await storeLocalFileData('deadliftExercisesWeek1', deadliftFilepath + 'deadliftExercisesWeek1DB.json');
      await storeLocalFileData('deadliftExercisesWeek2', deadliftFilepath + 'deadliftExercisesWeek2DB.json');
      await storeLocalFileData('deadliftExercisesWeek3', deadliftFilepath + 'deadliftExercisesWeek3DB.json');

      // const ohpFilepath = '../data/jsonFiles/ohp/'
      await storeLocalFileData('ohpExercisesWeekDeloadDB', ohpFilepath + 'OHPExercisesWeekDeloadDB.json');
      await storeLocalFileData('ohpExercisesWeek1DB', ohpFilepath + 'OHPExercisesWeek1DB.json');
      await storeLocalFileData('ohpExercisesWeek2DB', ohpFilepath + 'OHPExercisesWeek2DB.json');
      await storeLocalFileData('ohpExercisesWeek3DB', ohpFilepath + 'OHPExercisesWeek3DB.json');
      await storeLocalFileData('ohpExercisesWeekDeload', ohpFilepath + 'OHPExercisesWeekDeloadDB.json');
      await storeLocalFileData('ohpExercisesWeek1', ohpFilepath + 'OHPExercisesWeek1DB.json');
      await storeLocalFileData('ohpExercisesWeek2', ohpFilepath + 'OHPExercisesWeek2DB.json');
      await storeLocalFileData('ohpExercisesWeek3', ohpFilepath + 'OHPExercisesWeek3DB.json');
      
      // Add more items as needed
    } catch (error) {
      console.log('Error populating AsyncStorage:', error);
      // Handle the error accordingly
    }
  };

  const storeLocalFileData = async (key, filePath) => {
    try {
      const fileContent = await FileSystem.readFile(filePath, 'utf8');
      await AsyncStorage.setItem(key, fileContent);
      console.log('File data stored successfully.');
    } catch (error) {
      console.log('Error storing file data:', error);
    }
  };

  useEffect(() => {
    const performInitialSetup = async () => {
      const asyncStoragePopulated = await isAsyncStoragePopulated();
      if (!asyncStoragePopulated) {
        await populateAsyncStorage();
      }
      getData('week').then(data => setWeek(Number(data)));
      getData('SquatTM').then(data => setSquatTM(Number(data)));
      getData('BenchPressTM').then(data => setBenchPressTM(Number(data)));
      getData('DeadliftTM').then(data => setDeadliftTM(Number(data)));
      getData('OverheadPressTM').then(data => setOverheadPressTM(Number(data)));
      getData('SquatCheck').then(data => setSquatCheck(data));
      getData('BenchPressCheck').then(data => setBenchPressCheck(data));
      getData('DeadliftCheck').then(data => setDeadliftCheck(data));
      getData('OHPCheck').then(data => setOHPCheck(data));
    };
    performInitialSetup();
  }, []);

  const setUncheck = () => {
    storeData('SquatCheck', false).then(setSquatCheck(false));
    storeData('BenchPressCheck', false).then(setBenchPressCheck(false));
    storeData('DeadliftCheck', false).then(setDeadliftCheck(false));
    storeData('OHPCheck', false).then(setOHPCheck(false));
  };

  const storeExercises = async () => {
    // var tempSquatExercises = squatExercises
    // var tempBenchExercises = benchExercises
    // var tempDeadliftExercises = deadliftExercises
    // var tempOHPExercises = OHPExercises

    // for (var i in tempSquatExercises) {

    //     for (var j in tempSquatExercises[i].checked) {
    //         tempSquatExercises[i].checked[j] = false
    //         tempBenchExercises[i].checked[j] = false
    //         tempDeadliftExercises[i].checked[j] = false
    //         tempOHPExercises[i].checked[j] = false
    //     }
    // }

    if (week === 7) {
      getData('squatExercisesWeekDeloadDB').then(data =>
        storeData('squatExercisesWeekDeload', data),
      );
      getData('benchExercisesWeekDeloadDB').then(data =>
        storeData('benchExercisesWeekDeload', data),
      );
      getData('deadliftExercisesWeekDeloadDB').then(data =>
        storeData('deadliftExercisesWeekDeload', data),
      );
      getData('OHPExercisesWeekDeloadDB').then(data =>
        storeData('OHPExercisesWeekDeload', data),
      );
      // commented out logic was used below as well, and was buggy.
      // resulted in previous week's workouts being saved in next week's sometimes.
      // await Promise.all(
      //     [storeData('squatExercisesWeekDeload', tempSquatExercises),
      //     storeData('benchExercisesWeekDeload', tempBenchExercises),
      //     storeData('deadliftExercisesWeekDeload', tempDeadliftExercises),
      //     storeData('OHPExercisesWeekDeload', tempOHPExercises)])
    } else {
      var tempWeek = week % 3;
      switch (tempWeek) {
        case 1:
          getData('squatExercisesWeek1DB').then(data =>
            storeData('squatExercisesWeek1', data),
          );
          getData('benchExercisesWeek1DB').then(data =>
            storeData('benchExercisesWeek1', data),
          );
          getData('deadliftExercisesWeek1DB').then(data =>
            storeData('deadliftExercisesWeek1', data),
          );
          getData('OHPExercisesWeek1DB').then(data =>
            storeData('OHPExercisesWeek1', data),
          );
          break;
        case 2:
          getData('squatExercisesWeek2DB').then(data =>
            storeData('squatExercisesWeek2', data),
          );
          getData('benchExercisesWeek2DB').then(data =>
            storeData('benchExercisesWeek2', data),
          );
          getData('deadliftExercisesWeek2DB').then(data =>
            storeData('deadliftExercisesWeek2', data),
          );
          getData('OHPExercisesWeek2DB').then(data =>
            storeData('OHPExercisesWeek2', data),
          );
          break;
        case 0:
          getData('squatExercisesWeek3DB').then(data =>
            storeData('squatExercisesWeek3', data),
          );
          getData('benchExercisesWeek3DB').then(data =>
            storeData('benchExercisesWeek3', data),
          );
          getData('deadliftExercisesWeek3DB').then(data =>
            storeData('deadliftExercisesWeek3', data),
          );
          getData('OHPExercisesWeek3DB').then(data =>
            storeData('OHPExercisesWeek3', data),
          );
      }
    }
  };
  // switch case 0 corresponds to week 3/6!
  const updateExercises = () => {
    if (week === 7) {
      getData('squatExercisesWeekDeload').then(data => setSquatExercises(data));
      getData('benchExercisesWeekDeload').then(data => setBenchExercises(data));
      getData('deadliftExercisesWeekDeload').then(data =>
        setDeadliftExercises(data),
      );
      getData('OHPExercisesWeekDeload').then(data => setOHPExercises(data));
    } else {
      var tempWeek = week % 3;
      switch (tempWeek) {
        case 1:
          getData('squatExercisesWeek1').then(data => setSquatExercises(data));
          getData('benchExercisesWeek1').then(data => setBenchExercises(data));
          getData('deadliftExercisesWeek1').then(data =>
            setDeadliftExercises(data),
          );
          getData('OHPExercisesWeek1').then(data => setOHPExercises(data));
          break;
        case 2:
          getData('squatExercisesWeek2').then(data => setSquatExercises(data));
          getData('benchExercisesWeek2').then(data => setBenchExercises(data));
          getData('deadliftExercisesWeek2').then(data =>
            setDeadliftExercises(data),
          );
          getData('OHPExercisesWeek2').then(data => setOHPExercises(data));
          break;
        case 0:
          getData('squatExercisesWeek3').then(data => setSquatExercises(data));
          getData('benchExercisesWeek3').then(data => setBenchExercises(data));
          getData('deadliftExercisesWeek3').then(data =>
            setDeadliftExercises(data),
          );
          getData('OHPExercisesWeek3').then(data => setOHPExercises(data));
      }
    }
  };

  const updateCheckedExercises = (prefix, exercises) => {
    var keyName = prefix;
    if (week === 7) {
      keyName = keyName + 'ExercisesWeekDeload';
      storeData(keyName, exercises);
      return;
    }
    var tempWeek = week % 3;
    switch (tempWeek) {
      case 1:
        keyName = keyName + 'ExercisesWeek1';
        storeData(keyName, exercises);
        break;
      case 2:
        keyName = keyName + 'ExercisesWeek2';
        storeData(keyName, exercises);
        break;
      case 0:
        keyName = keyName + 'ExercisesWeek3';
        storeData(keyName, exercises);
    }
  };

  useEffect(() => {
    updateExercises();
  }, [week]);

  useEffect(() => {
    storeData('SquatTM', SquatTM);
  }, [SquatTM]);

  useEffect(() => {
    storeData('BenchPressTM', BenchPressTM);
  }, [BenchPressTM]);

  useEffect(() => {
    storeData('DeadliftTM', DeadliftTM);
  }, [DeadliftTM]);

  useEffect(() => {
    storeData('OverheadPressTM', OverheadPressTM);
  }, [OverheadPressTM]);

//   useEffect(() => {
//     storeData('deadliftExercisesWeek3DB', [
//       {
//         id: 1,
//         exerciseName: 'Deadlift',
//         percentages: [0.7, 0.8, 0.9, 1],
//         reps: [5, 3, 1, 1],
//         type: 'main',
//         checked: [false, false, false, false],
//       },
//       {
//         id: 2,
//         exerciseName: 'Pull Up',
//         reps: [10, 10, 10, 10, 10],
//         type: 'accessory',
//         checked: [false, false, false, false, false],
//       },
//       {
//         id: 3,
//         exerciseName: 'Dip',
//         reps: [10, 10, 10, 10, 10],
//         type: 'accessory',
//         checked: [false, false, false, false, false],
//       },
//       {
//         id: 4,
//         exerciseName: 'Lateral Raise',
//         reps: [20, 20, 20, 20],
//         type: 'accessory',
//         checked: [false, false, false, false],
//       },
//       {
//         id: 5,
//         exerciseName: 'Bicep Curl',
//         reps: [12, 12, 12, 12],
//         type: 'accessory',
//         checked: [false, false, false, false],
//       },
//       {
//         id: 6,
//         exerciseName: 'Tricep Pushdown',
//         reps: [15, 15, 15, 15],
//         type: 'accessory',
//         checked: [false, false, false, false],
//       },
//     ]);
//     storeData('squatExercisesWeek3DB', [
//       {
//         id: 1,
//         exerciseName: 'Squat',
//         percentages: [0.7, 0.8, 0.9, 1],
//         reps: [5, 3, 1, 1],
//         type: 'main',
//         checked: [false, false, false, false],
//       },
//       {
//         id: 2,
//         exerciseName: 'Pull Up',
//         reps: [10, 10, 10, 10, 10],
//         type: 'accessory',
//         checked: [false, false, false, false, false],
//       },
//       {
//         id: 3,
//         exerciseName: 'Dip',
//         reps: [10, 10, 10, 10, 10],
//         type: 'accessory',
//         checked: [false, false, false, false, false],
//       },
//       {
//         id: 4,
//         exerciseName: 'Lateral Raise',
//         reps: [20, 20, 20, 20],
//         type: 'accessory',
//         checked: [false, false, false, false],
//       },
//       {
//         id: 5,
//         exerciseName: 'Bicep Curl',
//         reps: [12, 12, 12, 12],
//         type: 'accessory',
//         checked: [false, false, false, false],
//       },
//       {
//         id: 6,
//         exerciseName: 'Tricep Pushdown',
//         reps: [15, 15, 15, 15],
//         type: 'accessory',
//         checked: [false, false, false, false],
//       },
//     ]);
//     storeData('benchExercisesWeek3DB', [
//       {
//         id: 1,
//         exerciseName: 'Bench Press',
//         percentages: [0.7, 0.8, 0.9, 1],
//         reps: [5, 3, 1, 1],
//         type: 'main',
//         checked: [false, false, false, false],
//       },
//       {
//         id: 2,
//         exerciseName: 'Hanging Leg Raise',
//         reps: [10, 10, 10, 10, 10],
//         type: 'accessory',
//         checked: [false, false, false, false, false],
//       },
//       {
//         id: 3,
//         exerciseName: 'Calf Raise',
//         reps: [15, 15, 15, 15, 15],
//         type: 'accessory',
//         checked: [false, false, false, false, false],
//       },
//       {
//         id: 4,
//         exerciseName: 'Lateral Raise',
//         reps: [20, 20, 20, 20],
//         type: 'accessory',
//         checked: [false, false, false, false],
//       },
//       {
//         id: 5,
//         exerciseName: 'Bicep Curl',
//         reps: [12, 12, 12, 12],
//         type: 'accessory',
//         checked: [false, false, false, false],
//       },
//       {
//         id: 6,
//         exerciseName: 'Tricep Pushdown',
//         reps: [15, 15, 15, 15],
//         type: 'accessory',
//         checked: [false, false, false, false],
//       },
//     ]);
//     storeData('OHPExercisesWeek3DB', [
//       {
//         id: 1,
//         exerciseName: 'Overhead Press',
//         percentages: [0.7, 0.8, 0.9, 1],
//         reps: [5, 3, 1, 1],
//         type: 'main',
//         checked: [false, false, false, false],
//       },
//       {
//         id: 2,
//         exerciseName: 'Hanging Leg Raise',
//         reps: [10, 10, 10, 10, 10],
//         type: 'accessory',
//         checked: [false, false, false, false, false],
//       },
//       {
//         id: 3,
//         exerciseName: 'Calf Raise',
//         reps: [15, 15, 15, 15, 15],
//         type: 'accessory',
//         checked: [false, false, false, false, false],
//       },
//       {
//         id: 4,
//         exerciseName: 'Lateral Raise',
//         reps: [20, 20, 20, 20],
//         type: 'accessory',
//         checked: [false, false, false, false],
//       },
//       {
//         id: 5,
//         exerciseName: 'Bicep Curl',
//         reps: [12, 12, 12, 12],
//         type: 'accessory',
//         checked: [false, false, false, false],
//       },
//       {
//         id: 6,
//         exerciseName: 'Tricep Pushdown',
//         reps: [15, 15, 15, 15],
//         type: 'accessory',
//         checked: [false, false, false, false],
//       },
//     ]);
//   });

  const checkIfSquatDone = newExercises => {
    for (var exercise of newExercises) {
      if (exercise.checked.includes(false)) {
        return;
      }
    }
    storeData('SquatCheck', true).then(setSquatCheck(true));
  };

  const checkIfBenchDone = newExercises => {
    for (var exercise of newExercises) {
      if (exercise.checked.includes(false)) {
        return;
      }
    }
    storeData('BenchPressCheck', true).then(setBenchPressCheck(true));
  };

  const checkIfDeadliftDone = newExercises => {
    for (var exercise of newExercises) {
      if (exercise.checked.includes(false)) {
        return;
      }
    }
    storeData('DeadliftCheck', true).then(setDeadliftCheck(true));
  };

  const checkIfOHPDone = newExercises => {
    for (var exercise of newExercises) {
      if (exercise.checked.includes(false)) {
        return;
      }
    }
    storeData('OHPCheck', true).then(setOHPCheck(true));
  };

  const enterSquatPage = () => {
    DeviceEventEmitter.addListener(
      'event.editSquatExercises',
      newSquatExercises => {
        setSquatExercises(newSquatExercises);
        updateCheckedExercises('squat', newSquatExercises);
        checkIfSquatDone(newSquatExercises);
      },
    );
    console.log('Squat Listener Added!');
    navigation.navigate('Squat', {
      squatExercises: squatExercises,
      SquatTM: SquatTM,
    });
  };

  const enterBenchPage = () => {
    DeviceEventEmitter.addListener(
      'event.editBenchExercises',
      newBenchExercises => {
        setBenchExercises(newBenchExercises);
        updateCheckedExercises('bench', newBenchExercises);
        checkIfBenchDone(newBenchExercises);
      },
    );
    console.log('Bench Listener Added!');
    navigation.navigate('Bench Press', {
      benchExercises: benchExercises,
      BenchPressTM: BenchPressTM,
    });
  };

  const enterDeadliftPage = () => {
    DeviceEventEmitter.addListener(
      'event.editDeadliftExercises',
      newDeadliftExercises => {
        setDeadliftExercises(newDeadliftExercises);
        updateCheckedExercises('deadlift', newDeadliftExercises);
        checkIfDeadliftDone(newDeadliftExercises);
      },
    );
    console.log('Deadlift Listener Added!');
    navigation.navigate('Deadlift', {
      deadliftExercises: deadliftExercises,
      DeadliftTM: DeadliftTM,
    });
  };

  const enterOHPPage = () => {
    DeviceEventEmitter.addListener(
      'event.editOHPExercises',
      newOHPExercises => {
        setOHPExercises(newOHPExercises);
        updateCheckedExercises('OHP', newOHPExercises);
        checkIfOHPDone(newOHPExercises);
      },
    );
    console.log('OHP Listener Added!');
    navigation.navigate('Overhead Press', {
      OHPExercises: OHPExercises,
      OverheadPressTM: OverheadPressTM,
    });
  };

  return (
    <View style={styles.container}>
      <TrainingMaxes
        week={week}
        SquatTM={SquatTM}
        BenchPressTM={BenchPressTM}
        DeadliftTM={DeadliftTM}
        OverheadPressTM={OverheadPressTM}
      />

      <ExerciseButton
        exerciseName={'Squat'}
        onButtonPress={enterSquatPage}
        setButtonState={setSquatCheck}
        checked={SquatCheck}
        setItemString={'SquatCheck'}
      />
      <ExerciseButton
        exerciseName={'Bench Press'}
        onButtonPress={enterBenchPage}
        setButtonState={setBenchPressCheck}
        checked={BenchPressCheck}
        setItemString={'BenchPressCheck'}
      />
      <ExerciseButton
        exerciseName={'Deadlift'}
        onButtonPress={enterDeadliftPage}
        setButtonState={setDeadliftCheck}
        checked={DeadliftCheck}
        setItemString={'DeadliftCheck'}
      />
      <ExerciseButton
        exerciseName={'Overhead Press'}
        onButtonPress={enterOHPPage}
        setButtonState={setOHPCheck}
        checked={OHPCheck}
        setItemString={'OHPCheck'}
      />

      <View style={styles.bottomContainer}>
        <RowOfButtons
          BeginNextWeek={BeginNextWeek}
          navigation={navigation}
          SquatTM={SquatTM}
          setSquatTM={setSquatTM}
          BenchPressTM={BenchPressTM}
          setBenchPressTM={setBenchPressTM}
          OverheadPressTM={OverheadPressTM}
          setOverheadPressTM={setOverheadPressTM}
          DeadliftTM={DeadliftTM}
          setDeadliftTM={setDeadliftTM}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    color: 'black',
    alignSelf: 'center',
    fontSize: 17,
  },

  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: 'white',
  },

  rowOfButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'center',
  },

  trainingMaxBox: {
    margin: 10,
    alignItems: 'center',
  },

  bottomContainer: {
    justifyContent: 'flex-end',
    flex: 1,
    marginBottom: 20,
  },
});

export default HomeScreen;
