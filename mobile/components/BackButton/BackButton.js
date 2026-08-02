import React from "react";
import PropTypes from "prop-types";
import styles from './style';
import { Pressable } from "react-native";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import globalStyle from "../../assets/styles/globalStyle";

const BackButton = ({
    onPress = () => {},
}) => {
    return (
        <Pressable style={styles.buttonContainer} onPress={() => onPress()}>
            <FontAwesomeIcon icon={faAngleLeft} color={globalStyle.themeColor} size={19} />
        </Pressable>
    )
};

export default BackButton;