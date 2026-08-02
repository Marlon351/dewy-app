import React from "react";
import { SafeAreaView, View } from "react-native";
import globalStyle from "../../assets/styles/globalStyle";
import BackButton from "../../components/BackButton/BackButton";

const ForgotPassword = ({navigation}) => {
    return (
        <SafeAreaView style={[globalStyle.flex, globalStyle.backgroundWhite]}>
            <View style={globalStyle.horizontalMargin}>
                <BackButton onPress={() => navigation.goBack()}/>
            </View>
        </SafeAreaView>
    )
}

export default ForgotPassword;