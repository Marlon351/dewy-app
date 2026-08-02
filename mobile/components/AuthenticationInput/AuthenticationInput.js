import { Image, Pressable, TextInput } from "react-native";
import styles from "./style";
import PropTypes from "prop-types";
import { useRef, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const AuthenticationInput = ({
    placeholder,
    onChangeText,
    placeholderTextColor,
    keyboardType,
    secureTextEntry,
    value,
    
}) => {
    const inputRef = useRef(null);
    const [visibility, setVisibility] = useState(secureTextEntry);
    return (
        <Pressable style={styles.inputContainer} onPress={() => inputRef.current.focus()}>
            <TextInput value={value} style={styles.input} secureTextEntry={visibility} ref={inputRef} keyboardType={keyboardType} placeholder={placeholder} placeholderTextColor={placeholderTextColor} onChangeText={(text) => onChangeText(text)}/>
            { secureTextEntry && 
                <Pressable style={styles.eyeButton} onPress={() => setVisibility(!visibility)}>
                    <FontAwesomeIcon icon={visibility ? faEye : faEyeSlash} size={18} color={"#2c1e29"}/>
                </Pressable>
            }
        </Pressable>
    )
}

export default AuthenticationInput;