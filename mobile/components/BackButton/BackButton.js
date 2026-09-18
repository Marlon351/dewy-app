import React from "react";
import PropTypes from "prop-types";
import createStyles from './style';
import { Pressable } from "react-native";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { useTheme } from "@react-navigation/native";

const BackButton = ({
    onPress = () => {},
}) => {

    const theme = useTheme();
    const styles = createStyles(theme);
    return (
        <Pressable style={styles.buttonContainer} onPress={() => onPress()}>
            <FontAwesomeIcon icon={faAngleLeft} color={theme.colors.primary} size={19} />
        </Pressable>
    )
};

export default BackButton;