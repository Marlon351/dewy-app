import { Text, View } from "react-native";
import createStyles from "./style";
import BackButton from "../../components/BackButton/BackButton";
import AuthenticationInput from "../../components/AuthenticationInput/AuthenticationInput";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MenuButton from "../../components/MenuButton/MenuButton";
import api from "../../api/user";
import { Routes } from "../../navigation/Routes";
import { logIn } from "../../redux/reducers/userSlice";
import { useTheme } from "@react-navigation/native";
import AppScreen from "../../components/AppScreen/AppScreen";

const ResetPassword = ({ navigation }) => {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const dispatch = useDispatch();
    const user = useSelector(state => state.persist.user);
    const theme = useTheme();
    const styles = createStyles(theme);

    const handleResetPassword = async () => {
        setError("");
        if (password == "" || confirmPassword == "") {
            setError("Fill out all fields!");
        }
        else {
            const response = await api.resetPassword(user.token, password, confirmPassword);
            if (response.statusCode == 200) {
                dispatch(logIn(response.responseInJSON.data));
                navigation.navigate(Routes.Login);
            }
            else {
                setError(response.responseInJSON.message);
            }
        }
    };

    return (
        <AppScreen>
            <BackButton onPress={() => navigation.popTo(Routes.ForgotPassword)} />
            <View style={styles.headerContainer}>
                <Text style={styles.headerText}>Set a new password.</Text>
                <Text style={styles.subHeaderText}></Text>
            </View>
            <View style={styles.inputContainer}>
                <AuthenticationInput value={password} placeholder={"Password"} onChangeText={(text) => setPassword(text)} secureTextEntry={true} />
                <AuthenticationInput value={confirmPassword} placeholder={"Confirm Password"} onChangeText={(text) => setConfirmPassword(text)} secureTextEntry={true} />
                <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>{error}</Text>
                </View>
                <MenuButton label={"Continue"} color={theme.colors.primary} onPress={() => handleResetPassword()} />
            </View>
        </AppScreen>
    );
};

export default ResetPassword;