import React, {useEffect} from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './components/HomeScreen';
import Squat from './components/Squat';
import BenchPress from './components/BenchPress';
import Deadlift from './components/Deadlift';
import OverheadPress from './components/OverheadPress';
import EditTrainingMax from './components/EditTrainingMax';

const App = () => {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      {/* <Stack.Navigator screenOptions={{animation: 'none'}}> */}
      <Stack.Navigator>
        <Stack.Screen name="Home" options={{title: "Boring But Big"}} component={HomeScreen} />
        <Stack.Screen name="Squat" component={Squat} />
        <Stack.Screen name="Bench Press" component={BenchPress} />
        <Stack.Screen name="Deadlift" component={Deadlift} />
        <Stack.Screen name="Overhead Press" component={OverheadPress} />
        <Stack.Screen name="Edit Training Max" component={EditTrainingMax} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App