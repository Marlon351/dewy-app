import React, { useState } from "react";
import { Alert, ScrollView, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "@react-navigation/native";
import AppScreen from "../../components/AppScreen/AppScreen";
import BackButton from "../../components/BackButton/BackButton";
import AuthenticationInput from "../../components/AuthenticationInput/AuthenticationInput";
import MenuButton from "../../components/MenuButton/MenuButton";
import api from "../../api/user";
import { updateUser } from "../../redux/reducers/userSlice";
import { setToken } from "../../redux/reducers/tokenSlice";
import createStyles from "./style";

const EditProfile = ({ navigation }) => {
    const user = useSelector(state => state.persist.user);
    const token = useSelector(state => state.persistSecure.token);
    const [firstName, setFirstName] = useState(user.firstName ?? "");
    const [lastName, setLastName] = useState(user.lastName ?? "");
    const [emailAddress, setEmailAddress] = useState(user.emailAddress ?? "");
    const [emailPassword, setEmailPassword] = useState("");
    const [profileError, setProfileError] = useState("");
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const dispatch = useDispatch();
    const theme = useTheme();
    const styles = createStyles(theme);

    // Changing the email needs the current password, so only ask for it when the email changes
    const isEmailChanged = emailAddress.trim().toLowerCase() != user.emailAddress;

    const handleSaveProfile = async () => {
        setProfileError("");
        if (firstName.trim() == "" || lastName.trim() == "" || emailAddress.trim() == "") {
            setProfileError("Fill out all fields!");
        }
        else if (isEmailChanged && emailPassword == "") {
            setProfileError("Enter your current password to change your email.");
        }
        else {
            const response = await api.updateMe(token, firstName.trim(), lastName.trim(), emailAddress.trim(), isEmailChanged ? emailPassword : undefined);
            if (response.statusCode == 200) {
                setEmailPassword("");
                dispatch(updateUser(response.responseInJSON.data));
                Alert.alert("Profile Updated", "Your profile has been saved.");
                navigation.goBack();
            }
            else {
                setProfileError(response.responseInJSON.message);
            }
        }
    };

    const handleUpdatePassword = async () => {
        setPasswordError("");
        if (currentPassword == "" || newPassword == "" || confirmNewPassword == "") {
            setPasswordError("Fill out all fields!");
        }
        else if (newPassword != confirmNewPassword) {
            setPasswordError("The passwords do not match.");
        }
        else {
            const response = await api.updateMyPassword(token, currentPassword, newPassword, confirmNewPassword);
            if (response.statusCode == 200) {
                setCurrentPassword("");
                setNewPassword("");
                setConfirmNewPassword("");
                // Changing the password invalidates old tokens, so store the new one
                dispatch(setToken(response.responseInJSON.token));
                Alert.alert("Password Updated", "Your password has been changed and your other devices have been logged out.");
            }
            else {
                setPasswordError(response.responseInJSON.message);
            }
        }
    };

    return (
        <AppScreen>
            <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled" automaticallyAdjustKeyboardInsets={true} contentContainerStyle={styles.scrollContent}>
                <BackButton onPress={() => navigation.goBack()} />
                <Text style={styles.headerText}>Edit Profile</Text>

                <View style={styles.avatarContainer}>
                    <View style={styles.avatar}>
                        <Text style={styles.avatarText}>{firstName.trim().charAt(0).toUpperCase()}</Text>
                    </View>
                </View>

                <Text style={styles.sectionHeader}>PERSONAL INFO</Text>
                <View style={styles.inputContainer}>
                    <AuthenticationInput value={firstName} placeholder={"First Name"} onChangeText={(text) => setFirstName(text)} />
                    <AuthenticationInput value={lastName} placeholder={"Last Name"} onChangeText={(text) => setLastName(text)} />
                    <AuthenticationInput value={emailAddress} keyboardType={"email-address"} placeholder={"Email"} onChangeText={(text) => setEmailAddress(text)} />
                    {isEmailChanged &&
                        <AuthenticationInput value={emailPassword} secureTextEntry={true} placeholder={"Current password to change email"} onChangeText={(text) => setEmailPassword(text)} />
                    }
                    <View style={styles.errorContainer}>
                        <Text style={styles.errorText}>{profileError}</Text>
                    </View>
                    <MenuButton label={"Save Changes"} color={theme.colors.primary} onPress={() => handleSaveProfile()} />
                </View>

                <Text style={styles.sectionHeader}>CHANGE PASSWORD</Text>
                <View style={styles.inputContainer}>
                    <AuthenticationInput value={currentPassword} secureTextEntry={true} placeholder={"Current Password"} onChangeText={(text) => setCurrentPassword(text)} />
                    <AuthenticationInput value={newPassword} secureTextEntry={true} placeholder={"New Password"} onChangeText={(text) => setNewPassword(text)} />
                    <AuthenticationInput value={confirmNewPassword} secureTextEntry={true} placeholder={"Confirm New Password"} onChangeText={(text) => setConfirmNewPassword(text)} />
                    <View style={styles.errorContainer}>
                        <Text style={styles.errorText}>{passwordError}</Text>
                    </View>
                    <MenuButton label={"Update Password"} variant={"outlined"} color={theme.colors.primary} onPress={() => handleUpdatePassword()} />
                </View>
            </ScrollView>
        </AppScreen>
    );
};

export default EditProfile;
