import { StyleSheet } from 'react-native';

const globalStyle = StyleSheet.create({
    backgroundWhite: {
        backgroundColor: '#FFFFFF',
    },
    flex: {
        flex: 1,
    },
    navigationScreen: {
        header: () => null, 
        headerShown: false
    },
    horizontalMargin: {
        marginHorizontal: 20,
    },
    themeColor: "rgb(20, 178, 141)",

});

export default globalStyle;
