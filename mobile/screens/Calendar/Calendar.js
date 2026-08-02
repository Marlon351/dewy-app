import React from "react";
import { SafeAreaView, Text } from "react-native";
import globalStyle from "../../assets/styles/globalStyle";

const Calendar = ({navigation}) => {
    return (
        <SafeAreaView style={[globalStyle.flex, globalStyle.backgroundWhite]}>
            <Text>Calendar</Text>
        </SafeAreaView>
    );
};

export default Calendar;