import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    inputContainer: {
        width: '100%',
        height: 56,
        backgroundColor: '#F7F8F9',
        borderWidth: 1,
        borderRadius: 8,
        borderColor: '#DADADA',
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',

    },
    input: {
        color: '#2c1e29',
        fontSize: 15,
        fontWeight: 'medium',
        flex: 1,
    },
    eyeButton: {
        marginLeft: 20,
    },
});

export default styles;