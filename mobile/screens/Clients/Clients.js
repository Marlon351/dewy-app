import React from "react";
import { SafeAreaView, Text } from "react-native";
import globalStyle from "../../assets/styles/globalStyle";

const Clients = ({navigation}) => {
    return (
        <SafeAreaView style={[globalStyle.flex, globalStyle.backgroundWhite]}>
            <Text>Clients</Text>
        </SafeAreaView>
    );
}

export default Clients;