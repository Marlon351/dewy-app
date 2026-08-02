import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Routes } from './Routes';
import globalStyle from './../assets/styles/globalStyle';
import Welcome from './../screens/Welcome/Welcome';
import Login from './../screens/Login/Login';
import Register from './../screens/Register/Register';
import Home from './../screens/Home/Home';
import ForgotPassword from '../screens/ForgotPassword/ForgotPassword';
import Account from '../screens/Account/Account';
import { faAddressBook, faCalendar, faHome } from '@fortawesome/free-regular-svg-icons';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import Calendar from '../screens/Calendar/Calendar';
import Clients from '../screens/Clients/Clients';

const Stack = createNativeStackNavigator();
const MainBottomTab = createBottomTabNavigator();

export const NonAuthenticated = () => {
  return (
    <Stack.Navigator initialRouteName={Routes.Welcome} screenOptions={globalStyle.navigationScreen} >
      <Stack.Screen name={Routes.Welcome} component={Welcome} />
      <Stack.Screen name={Routes.Login} component={Login} />
      <Stack.Screen name={Routes.Register} component={Register} />
      <Stack.Screen name={Routes.ForgotPassword} component={ForgotPassword} />
      <Stack.Screen name={Routes.Main} component={Main} />
    </Stack.Navigator>
  );
};

export const Authenticated = () => {
  return (
    <Stack.Navigator initialRouteName={Routes.Main} screenOptions={globalStyle.navigationScreen} >
      <Stack.Screen name={Routes.Welcome} component={Welcome} />
      <Stack.Screen name={Routes.Login} component={Login} />
      <Stack.Screen name={Routes.Register} component={Register} />
      <Stack.Screen name={Routes.ForgotPassword} component={ForgotPassword} />
      <Stack.Screen name={Routes.Main} component={Main} />
    </Stack.Navigator>
  );
};

export const Main = () => {
  return (
    <MainBottomTab.Navigator screenOptions={{ headerShown: false }}>
      <MainBottomTab.Screen name={Routes.Home} component={Home} options={{tabBarActiveTintColor: globalStyle.themeColor, tabBarIcon: ({focused, color, size}) => homeTabIcon(focused, color, size)}}/>
      <MainBottomTab.Screen name={Routes.Calendar} component={Calendar} options={{tabBarActiveTintColor: globalStyle.themeColor, tabBarIcon: ({focused, color, size}) => calendarTabIcon(focused, color, size)}}/>
      <MainBottomTab.Screen name={Routes.Clients} component={Clients} options={{tabBarActiveTintColor: globalStyle.themeColor, tabBarIcon: ({focused, color, size}) => clientsTabIcon(focused, color, size)}}/>
      <MainBottomTab.Screen name={Routes.Account} component={Account} options={{tabBarActiveTintColor: globalStyle.themeColor, tabBarIcon: ({focused, color, size}) => accountTabIcon(focused, color, size)}}/>
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

const clientsTabIcon = (focused, color, size) => {
  return (
    <FontAwesomeIcon icon={faAddressBook} color={color} size={size} />
  );
};