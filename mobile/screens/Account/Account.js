import React from "react";
import { SafeAreaView, Text, View } from "react-native";
import globalStyle from "../../assets/styles/globalStyle";
import MenuButton from "../../components/MenuButton/MenuButton";
import { useSelector } from "react-redux";
import { Routes } from "../../navigation/Routes";
import { useDispatch } from "react-redux";
import { resetToInitialState } from "../../redux/reducers/User";

const Account = ({navigation}) => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);

    const handleLogOut = () => {
        dispatch(resetToInitialState());
        navigation.navigate(Routes.Welcome);
    }
    return (
        <SafeAreaView style={[globalStyle.flex, globalStyle.backgroundWhite]}>
            <View style={globalStyle.horizontalMargin}>
                <MenuButton label={"Log Out"} color={globalStyle.themeColor} onPress={() => handleLogOut()}/>
            </View>
        </SafeAreaView>
    );
}

export default Account;