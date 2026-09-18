import { Image, Pressable, TextInput } from "react-native";
import createStyles from "./style";
import PropTypes from "prop-types";
import { useRef, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useTheme } from "@react-navigation/native";

const AuthenticationInput = ({
    placeholder,
    onChangeText,
    keyboardType,
    secureTextEntry,
    value,

}) => {
    const inputRef = useRef(null);
    const [visibility, setVisibility] = useState(secureTextEntry);
    const theme = useTheme();
    const styles = createStyles(theme);
    return (
        <Pressable style={styles.inputContainer} onPress={() => inputRef.current.focus()}>
            <TextInput value={value} style={styles.input} secureTextEntry={visibility} ref={inputRef} keyboardType={keyboardType} placeholder={placeholder} placeholderTextColor={theme.colors.border} onChangeText={(text) => onChangeText(text)}/>
            { secureTextEntry && 
                <Pressable style={styles.eyeButton} onPress={() => setVisibility(!visibility)}>
                    <FontAwesomeIcon icon={visibility ? faEye : faEyeSlash} size={18} color={theme.colors.border}/>
                </Pressable>
            }
        </Pressable>
    )
}

export default AuthenticationInput;