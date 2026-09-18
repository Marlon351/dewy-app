import React from "react";
import { SafeAreaView, Switch, Text, View } from "react-native";
import MenuButton from "../../components/MenuButton/MenuButton";
import { useSelector } from "react-redux";
import { Routes } from "../../navigation/Routes";
import { useDispatch } from "react-redux";
import { resetToInitialState } from "../../redux/reducers/userSlice";
import { useTheme } from "@react-navigation/native";
import AppScreen from "../../components/AppScreen/AppScreen";
import { Appearance } from 'react-native';
import { switchTheme } from "../../redux/reducers/preferencesSlice";

const Account = ({navigation}) => {
    const dispatch = useDispatch();
    const theme = useTheme();

    const handleLogOut = () => {
        dispatch(resetToInitialState());
        navigation.navigate(Routes.Welcome);
    };

    const handleThemeSwitch = () => {
        dispatch(switchTheme());

    };
    return (
        <AppScreen>
            <MenuButton label={"Log Out"} color={theme.colors.primary} onPress={() => handleLogOut()}/>
            <MenuButton label={"Change Theme"} color={theme.colors.primary} onPress={() => handleThemeSwitch()}/>
        </AppScreen>
    );
}

export default Account;