import React from "react";
import { Alert, Linking, Pressable, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { Routes } from "../../navigation/Routes";
import { useDispatch } from "react-redux";
import { useTheme } from "@react-navigation/native";
import AppScreen from "../../components/AppScreen/AppScreen";
import { setTheme } from "../../redux/reducers/preferencesSlice";
import SegmentedControl from "../../components/SegmentedControl/SegmentedControl";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faArrowRightFromBracket, faChevronRight, faFileLines, faShieldHalved, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import api from "../../api/user";
import { logOut } from "../../redux/session";
import { PRIVACY_POLICY_URL, TERMS_OF_SERVICE_URL } from "../../api/client";
import { getStreaks } from "../../utils/progress";
import createStyles from "./style";

const themeOptions = [
    { label: "System", value: "system", emoji: "📱" },
    { label: "Light", value: "light", emoji: "☀️" },
    { label: "Dark", value: "dark", emoji: "🌙" },
];

const Account = ({navigation}) => {
    const dispatch = useDispatch();
    const theme = useTheme();
    const styles = createStyles(theme);
    const user = useSelector(state => state.persist.user);
    const token = useSelector(state => state.persistSecure.token);
    const themePreference = useSelector(state => state.persist.preferences.theme);
    const routine = useSelector(state => state.persist.routine);
    const { current, best } = getStreaks(routine);

    const handleLogOut = () => {
        dispatch(logOut());
        navigation.navigate(Routes.Welcome);
    };

    const handleDeleteAccount = () => {
        Alert.alert(
            "Delete Account",
            "Are you sure you want to delete your account? This cannot be undone.",
            [
                { text: "Cancel", style: "cancel" },
                { text: "Delete", style: "destructive", onPress: () => deleteAccount() },
            ]
        );
    };

    const deleteAccount = async () => {
        const response = await api.deleteMe(token);
        if (response.statusCode == 204) {
            handleLogOut();
        }
        else {
            Alert.alert("Error", "Something went wrong deleting your account. Please try again.");
        }
    };

    // Each row gets its own icon color, destructive rows also color the label
    const settingsRow = (icon, label, onPress, color, lightColor, isDestructive = false) => {
        return (
            <Pressable style={styles.row} onPress={() => onPress()}>
                <View style={[styles.rowIconContainer, { backgroundColor: lightColor }]}>
                    <FontAwesomeIcon icon={icon} color={color} size={16} />
                </View>
                <Text style={[styles.rowLabel, { color: isDestructive ? color : theme.colors.text }]}>{label}</Text>
                <FontAwesomeIcon icon={faChevronRight} color={theme.colors.secondaryText} size={14} />
            </Pressable>
        );
    };

    return (
        <AppScreen>
            <View style={styles.profileContainer}>
                <View style={styles.avatar}>
                    <Text style={styles.avatarText}>{user.firstName?.charAt(0)}</Text>
                </View>
                <View style={styles.profileTextContainer}>
                    <Text style={styles.nameText}>{user.firstName} {user.lastName}</Text>
                    <Text style={styles.emailText}>{user.emailAddress}</Text>
                </View>
            </View>
            <View style={styles.statsRow}>
                <View style={[styles.statPill, { backgroundColor: theme.colors.streakLight }]}>
                    <Text style={[styles.statPillText, { color: theme.colors.streak }]}>🔥 {current} day streak</Text>
                </View>
                <View style={[styles.statPill, { backgroundColor: theme.colors.goldLight }]}>
                    <Text style={[styles.statPillText, { color: theme.colors.gold }]}>🏆 Best: {best}</Text>
                </View>
            </View>

            <Text style={styles.sectionHeader}>APPEARANCE</Text>
            <SegmentedControl options={themeOptions} selectedValue={themePreference} onChange={(value) => dispatch(setTheme(value))} />

            <Text style={styles.sectionHeader}>SETTINGS</Text>
            <View style={styles.card}>
                {settingsRow(faUser, "Edit Profile", () => navigation.navigate(Routes.EditProfile), theme.colors.primary, theme.colors.primaryLight)}
            </View>

            <Text style={styles.sectionHeader}>LEGAL</Text>
            <View style={styles.card}>
                {settingsRow(faShieldHalved, "Privacy Policy", () => Linking.openURL(PRIVACY_POLICY_URL), theme.colors.blue, theme.colors.blueLight)}
                {settingsRow(faFileLines, "Terms of Service", () => Linking.openURL(TERMS_OF_SERVICE_URL), theme.colors.evening, theme.colors.eveningLight)}
            </View>

            <View style={[styles.card, styles.accountCard]}>
                {settingsRow(faArrowRightFromBracket, "Log Out", () => handleLogOut(), theme.colors.morning, theme.colors.morningLight)}
                {settingsRow(faTrashCan, "Delete Account", () => handleDeleteAccount(), theme.colors.error, theme.colors.errorLight, true)}
            </View>
        </AppScreen>
    );
}

export default Account;
