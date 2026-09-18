import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { useSelector } from "react-redux";
import styles from "./style";
import AppScreen from "../../components/AppScreen/AppScreen";
import { useTheme } from "@react-navigation/native";
import createStyles from "./style";

const Home = ({ navigation }) => {
    const user = useSelector(state => state.persist.user);
    const theme = useTheme();
    const styles = createStyles(theme);
    
    return (
        <AppScreen>
            <View style={styles.headerContainer}>
                <Text style={styles.headerIntroText}>Hello, </Text>
                <Text style={styles.headerFirstNameText}>{user.firstName} 👋</Text>
            </View>
        </AppScreen>
    )
}

export default Home;