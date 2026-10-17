import { Image, Pressable, Text, TextInput, View } from "react-native";
import createStyles from "./style";
import PropTypes from "prop-types";
import { useRef, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useTheme } from "@react-navigation/native";

const AuthenticationInput = ({
    label,
    placeholder,
    onChangeText,
    keyboardType,
    secureTextEntry,
    autoCapitalize,
    autoComplete,
    value,

}) => {
    const inputRef = useRef(null);
    const [visibility, setVisibility] = useState(secureTextEntry);
    const theme = useTheme();
    const styles = createStyles(theme);
    const input = (
        <Pressable style={styles.inputContainer} onPress={() => inputRef.current.focus()}>
            <TextInput value={value} style={styles.input} secureTextEntry={visibility} ref={inputRef} keyboardType={keyboardType} autoCapitalize={autoCapitalize} autoComplete={autoComplete} placeholder={placeholder} placeholderTextColor={theme.colors.secondaryText} onChangeText={(text) => onChangeText(text)}/>
            { secureTextEntry &&
                <Pressable style={styles.eyeButton} hitSlop={10} onPress={() => setVisibility(!visibility)}>
                    <FontAwesomeIcon icon={visibility ? faEye : faEyeSlash} size={18} color={theme.colors.secondaryText}/>
                </Pressable>
            }
        </Pressable>
    );

    // Inputs with a label get it shown above them, the rest render exactly as before
    if (!label) {
        return input;
    }
    return (
        <View style={styles.field}>
            <Text style={styles.label}>{label}</Text>
            {input}
        </View>
    );
}

export default AuthenticationInput;
