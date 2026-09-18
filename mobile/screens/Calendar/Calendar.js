import React from "react";
import { SafeAreaView, Text } from "react-native";
import { useTheme } from "@react-navigation/native";
import AppScreen from "../../components/AppScreen/AppScreen";

const Calendar = ({navigation}) => {
    const theme = useTheme();
    return (
        <AppScreen>
            <Text>Calendar</Text>
        </AppScreen>
    );
};

export default Calendar;