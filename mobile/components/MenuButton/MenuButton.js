import React from "react";
import styles from "./style";
import { Pressable, Text } from "react-native";
import { useTheme } from "@react-navigation/native";

const MenuButton = ({
    onPress = () => {},
    variant = 'filled',
    label, 
    color,

}) => {
    const theme = useTheme();
    const isOutlined = variant === "outlined";
    return (
        <Pressable onPress={() => onPress()} style={[styles.buttonContainer, { backgroundColor: color, borderColor: color}, isOutlined && { backgroundColor: theme.colors.background}]}>
            <Text style={[styles.label, { color: "#FFFFFF"}, isOutlined && { color: color}]}>{label}</Text>
        </Pressable>
    )
};

export default MenuButton;