import { DefaultTheme, DarkTheme as NavigationDarkTheme } from '@react-navigation/native';

const LightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "rgb(22, 129, 102)",
    error: "#E5484D",
  },
};

const DarkTheme = {
    ...NavigationDarkTheme,
  colors: {
    ...NavigationDarkTheme.colors,
    primary: "rgb(22, 129, 102)",
    background: "rgb(18, 18, 18)",
    card: "rgb(30, 30, 30)",
    error: "#FF6B6B",
  },
};

export default {
  LightTheme,
  DarkTheme,
};