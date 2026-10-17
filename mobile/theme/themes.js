import { DefaultTheme, DarkTheme as NavigationDarkTheme } from '@react-navigation/native';

// Neutral base, with the brand teal and soft accents carrying the color
const LightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#2C6E72",
    background: "#F6F7F8",
    card: "#FFFFFF",
    border: "#E4E7EA",
    error: "#D9534F",
    secondaryText: "rgb(107, 114, 128)",
    morning: "#3B8FC2",
    evening: "#5563B0",
    streak: "#C8714F",
    gold: "#A9852C",
    pink: "#B95B7F",
    blue: "#2F7FA8",
    primaryLight: "rgba(44, 110, 114, 0.10)",
    morningLight: "rgba(59, 143, 194, 0.10)",
    eveningLight: "rgba(85, 99, 176, 0.10)",
    streakLight: "rgba(200, 113, 79, 0.10)",
    goldLight: "rgba(169, 133, 44, 0.10)",
    pinkLight: "rgba(185, 91, 127, 0.08)",
    blueLight: "rgba(47, 127, 168, 0.08)",
    errorLight: "rgba(217, 83, 79, 0.10)",
  },
};

const DarkTheme = {
    ...NavigationDarkTheme,
  colors: {
    ...NavigationDarkTheme.colors,
    primary: "#4FA9AE",
    background: "#121314",
    card: "#1C1D1F",
    border: "#2C2E31",
    error: "#F07B78",
    secondaryText: "rgb(156, 163, 175)",
    morning: "#6BB3DE",
    evening: "#8C98E0",
    streak: "#E79474",
    gold: "#D4B062",
    pink: "#DD8AAA",
    blue: "#6FB2D6",
    primaryLight: "rgba(79, 169, 174, 0.16)",
    morningLight: "rgba(107, 179, 222, 0.14)",
    eveningLight: "rgba(140, 152, 224, 0.14)",
    streakLight: "rgba(231, 148, 116, 0.14)",
    goldLight: "rgba(212, 176, 98, 0.14)",
    pinkLight: "rgba(221, 138, 170, 0.12)",
    blueLight: "rgba(111, 178, 214, 0.12)",
    errorLight: "rgba(240, 123, 120, 0.14)",
  },
};

export default {
  LightTheme,
  DarkTheme,
};
