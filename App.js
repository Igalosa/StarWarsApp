import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import StarWarsCards from './src/Components/StarWarsCards';
import DetailedCard from './src/routes/DetailedCard';

export default function App() {
  const HomeStack = createNativeStackNavigator();

  function HomeScreen() {
    return (
      <HomeStack.Navigator>
        <HomeStack.Screen
          name="HomeTabs"
          component={StarWarsCards}
          options={{headerShown: false}}
        />
        <HomeStack.Screen
          name="DetailedCard"
          component={DetailedCard}
          options={({route}) => ({
            title: route.params.detailedData.name,
            headerBackVisible: true,
            headerBackTitle: 'Back',
          })}
        />
      </HomeStack.Navigator>
    );
  }

  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          options={{headerShown: false}}
          component={HomeScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
