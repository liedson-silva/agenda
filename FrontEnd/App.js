import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './src/pages/Login.js';
import Register from './src/pages/Register.js';
import Home from './src/pages/Home.js';
import NewAppointment from './src/pages/NewAppointment.js';
import DetailsAppointment from './src/pages/DetailsAppointment.js';
import UpdateAppointment from './src/pages/UpdateAppointment.js';
import Toast from 'react-native-toast-message';
import { toastConfig } from './src/utils/ToastColor.js';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="NewAppointment" component={NewAppointment} />
        <Stack.Screen name="DetailsAppointment" component={DetailsAppointment} />
        <Stack.Screen name="EditAppointment" component={UpdateAppointment} />
      </Stack.Navigator>
        <Toast config={toastConfig} />
    </NavigationContainer>
  );
}