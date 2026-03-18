import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './src/pages/Login.js';
import Register from './src/pages/Register.js';
import ForgotPassword from './src/pages/ForgotPassword.js';
import VerifyOtp from './src/pages/VerifyOtp.js';
import ResetPassword from './src/pages/ResetPassword.js';
import Home from './src/pages/Home.js';
import NewAppointment from './src/pages/NewAppointment.js';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen name="VerifyOtp" component={VerifyOtp} />
        <Stack.Screen name="ResetPassword" component={ResetPassword} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="NewAppointment" component={NewAppointment} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}