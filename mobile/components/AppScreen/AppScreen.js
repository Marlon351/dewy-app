import { SafeAreaView, View } from "react-native";
import { useTheme } from "@react-navigation/native";
import createStyles from "./style";

const AppScreen = ({children}) => {
    const theme = useTheme();
    const styles = createStyles(theme);
    return (
        <SafeAreaView style={styles.screenContainer}>
            <View style={[styles.safeAreaContainer]}>
                {children}
            </View>
        </SafeAreaView>
    );
};

export default AppScreen;