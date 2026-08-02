import React from "react";
import styles from "./style";
import PropTypes from "prop-types";
import { Pressable, Text } from "react-native";

const MenuButton = ({
    onPress = () => {},
    variant = 'filled',
    label, 
    color,

}) => {
    const isOutlined = variant === "outlined";
    return (
        <Pressable onPress={() => onPress()} style={[styles.buttonContainer, { backgroundColor: color, borderColor: color}, isOutlined && { backgroundColor: '#FFFFFF'}]}>
            <Text style={[styles.label, { color: '#FFFFFF'}, isOutlined && { color: color}]}>{label}</Text>
        </Pressable>
    )
};

export default MenuButton;