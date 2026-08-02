import React from "react";
import { Pressable, SafeAreaView, Text, View } from "react-native";
import globalStyle from "../../assets/styles/globalStyle";
import MenuButton from './../../components/MenuButton/MenuButton';
import styles from "./style";
import { Routes } from "../../navigation/Routes";

const Welcome = ({navigation}) => {
    return (
        <SafeAreaView style={[globalStyle.flex, globalStyle.backgroundWhite]}>
            <View style={globalStyle.horizontalMargin}>
                <View style={styles.menu}>
                    <MenuButton label={"Login"} color={globalStyle.themeColor} onPress={() => navigation.navigate(Routes.Login)}/>
                    <MenuButton label={"Register"} color={globalStyle.themeColor} variant={"outlined"} onPress={() => navigation.navigate(Routes.Register)}/>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default Welcome;