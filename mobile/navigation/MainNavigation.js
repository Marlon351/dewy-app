import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Routes } from './Routes';
import Welcome from './../screens/Welcome/Welcome';
import Login from './../screens/Login/Login';
import Register from './../screens/Register/Register';
import Home from './../screens/Home/Home';
import ForgotPassword from '../screens/ForgotPassword/ForgotPassword';
import Account from '../screens/Account/Account';
import { faCalendar, faHome, faRectangleList } from '@fortawesome/free-regular-svg-icons';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import Calendar from '../screens/Calendar/Calendar';
import Routine from '../screens/Routine/Routine';
import EditProfile from '../screens/EditProfile/EditProfile';
import EmailVerification from '../screens/EmailVerification/EmailVerification';
import ResetPassword from '../screens/ResetPassword/ResetPassword';
import { useTheme } from "@react-navigation/native";

const Stack = createNativeStackNavigator();
const MainBottomTab = createBottomTabNavigator();

export const NonAuthenticated = () => {
  return (
    <Stack.Navigator initialRouteName={Routes.Welcome} screenOptions={{
        header: () => null, 
        headerShown: false
    }} >
      <Stack.Screen name={Routes.Welcome} component={Welcome} />
      <Stack.Screen name={Routes.Login} component={Login} />
      <Stack.Screen name={Routes.Register} component={Register} />
      <Stack.Screen name={Routes.ForgotPassword} component={ForgotPassword} />
      <Stack.Screen name={Routes.EmailVerification} component={EmailVerification} />
      <Stack.Screen name={Routes.ResetPassword} component={ResetPassword}/>
      <Stack.Screen name={Routes.Main} component={Main} />
      <Stack.Screen name={Routes.EditProfile} component={EditProfile} />
    </Stack.Navigator>
  );
};

export const Authenticated = () => {
  return (
    <Stack.Navigator initialRouteName={Routes.Main} screenOptions={{
        header: () => null, 
        headerShown: false
    }} >
      <Stack.Screen name={Routes.Welcome} component={Welcome} />
      <Stack.Screen name={Routes.Login} component={Login} />
      <Stack.Screen name={Routes.Register} component={Register} />
      <Stack.Screen name={Routes.ForgotPassword} component={ForgotPassword} />
      <Stack.Screen name={Routes.EmailVerification} component={EmailVerification} />
      <Stack.Screen name={Routes.ResetPassword} component={ResetPassword}/>
      <Stack.Screen name={Routes.Main} component={Main} />
      <Stack.Screen name={Routes.EditProfile} component={EditProfile} />
    </Stack.Navigator>
  );
};

export const Main = () => {
  const theme = useTheme();
  return (
    <MainBottomTab.Navigator screenOptions={{ headerShown: false }}>
      <MainBottomTab.Screen name={Routes.Home} component={Home} options={{tabBarActiveTintColor: theme.colors.primary, tabBarIcon: ({focused, color, size}) => homeTabIcon(focused, color, size)}}/>
      <MainBottomTab.Screen name={Routes.Routine} component={Routine} options={{tabBarActiveTintColor: theme.colors.primary, tabBarIcon: ({focused, color, size}) => routineTabIcon(focused, color, size)}}/>
      <MainBottomTab.Screen name={Routes.Calendar} component={Calendar} options={{tabBarActiveTintColor: theme.colors.primary, tabBarIcon: ({focused, color, size}) => calendarTabIcon(focused, color, size)}}/>
      <MainBottomTab.Screen name={Routes.Account} component={Account} options={{tabBarActiveTintColor: theme.colors.primary, tabBarIcon: ({focused, color, size}) => accountTabIcon(focused, color, size)}}/>
    </MainBottomTab.Navigator>
  );
};

const homeTabIcon = (focused, color, size) => {
  return (
    <FontAwesomeIcon icon={faHome} color={color} size={size} />
  );
};

const accountTabIcon = (focused, color, size) => {
  return (
    <FontAwesomeIcon icon={faUser} color={color} size={size} />
  );
};

const calendarTabIcon = (focused, color, size) => {
  return (
    <FontAwesomeIcon icon={faCalendar} color={color} size={size} />
  );
};

const routineTabIcon = (focused, color, size) => {
  return (
    <FontAwesomeIcon icon={faRectangleList} color={color} size={size} />
  );
};