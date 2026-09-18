import React from "react";
import { Pressable, SafeAreaView, Text, View } from "react-native";
import MenuButton from './../../components/MenuButton/MenuButton';
import styles from "./style";
import { Routes } from "../../navigation/Routes";
import { useTheme } from "@react-navigation/native";
import AppScreen from "../../components/AppScreen/AppScreen";

const Welcome = ({ navigation }) => {
    const theme = useTheme();

    return (
        <AppScreen>
            <View style={styles.menu}>
                <MenuButton label={"Login"} color={theme.colors.primary} onPress={() => navigation.navigate(Routes.Login)} />
                <MenuButton label={"Register"} color={theme.colors.primary} variant={"outlined"} onPress={() => navigation.navigate(Routes.Register)} />
            </View>
        </AppScreen>
    )
}

export default Welcome;