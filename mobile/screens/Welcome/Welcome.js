import React from "react";
import { Image, Pressable, ScrollView, Text, View } from "react-native";
import MenuButton from './../../components/MenuButton/MenuButton';
import createStyles from "./style";
import { Routes } from "../../navigation/Routes";
import { useTheme } from "@react-navigation/native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faChartLine, faFire, faListCheck } from "@fortawesome/free-solid-svg-icons";
import AppScreen from "../../components/AppScreen/AppScreen";

const features = [
    { icon: faListCheck, title: "Build your routine", description: "Morning and evening steps, tailored to your skin." },
    { icon: faFire, title: "Stay consistent", description: "Check off each step and keep your streak alive." },
    { icon: faChartLine, title: "See your progress", description: "Track how your skin feels, day by day." },
];

const Welcome = ({ navigation }) => {
    const theme = useTheme();
    const styles = createStyles(theme);

    return (
        <AppScreen>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                <View style={styles.heroContainer}>
                    <Image source={require("../../assets/images/dewy-logo.png")} style={styles.logo} />
                    <Text style={styles.appName}>Dewy</Text>
                    <Text style={styles.tagline}>Build a skincare routine you'll actually stick to.</Text>
                </View>

                <View style={styles.featuresCard}>
                    {features.map(feature => (
                        <View key={feature.title} style={styles.featureRow}>
                            <View style={styles.featureIconContainer}>
                                <FontAwesomeIcon icon={feature.icon} color={theme.colors.primary} size={18} />
                            </View>
                            <View style={styles.featureTextContainer}>
                                <Text style={styles.featureTitle}>{feature.title}</Text>
                                <Text style={styles.featureDescription}>{feature.description}</Text>
                            </View>
                        </View>
                    ))}
                </View>

                <View style={styles.menu}>
                    <MenuButton label={"Get Started"} color={theme.colors.primary} onPress={() => navigation.navigate(Routes.Register)} />
                    <Pressable style={styles.loginButton} onPress={() => navigation.navigate(Routes.Login)}>
                        <Text style={styles.loginText}>I already have an account</Text>
                    </Pressable>
                </View>
            </ScrollView>
        </AppScreen>
    )
}

export default Welcome;
