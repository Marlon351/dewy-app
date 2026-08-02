import React, { useEffect, useState } from "react";
import { SafeAreaView, Text, View } from "react-native";
import globalStyle from "../../assets/styles/globalStyle";
import MenuButton from "../../components/MenuButton/MenuButton";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { useSelector } from "react-redux";
import { Routes } from "../../navigation/Routes";
import styles from "./style";

const Home = ({navigation}) => {
    const user = useSelector(state => state.user);
    return (
        <SafeAreaView style={[globalStyle.flex, globalStyle.backgroundWhite]}>
            <View style={globalStyle.horizontalMargin}>
                <View style={styles.headerContainer}>
                    <Text style={styles.headerIntroText}>Hello, </Text>
                    <Text style={styles.headerFirstNameText}>{user.firstName} 👋</Text>
                </View>

            </View>
        </SafeAreaView>
    )
}

export default Home;