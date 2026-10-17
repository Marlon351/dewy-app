import React from "react";
import { Pressable, Text, View } from "react-native";
import { useTheme } from "@react-navigation/native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import createStyles from "./style";

const SegmentedControl = ({
    options,
    selectedValue,
    onChange = () => {},
}) => {
    const theme = useTheme();
    const styles = createStyles(theme);
    return (
        <View style={styles.container}>
            {options.map(option => {
                const isSelected = selectedValue === option.value;
                const color = isSelected ? "#FFFFFF" : theme.colors.text;
                // Options can have their own selected color, e.g. amber for morning
                const selectedColor = option.color ?? theme.colors.primary;
                return (
                    <Pressable key={option.value} style={[styles.option, isSelected && { backgroundColor: selectedColor }]} onPress={() => onChange(option.value)}>
                        {option.emoji && <Text style={styles.emoji}>{option.emoji}</Text>}
                        {option.icon && <FontAwesomeIcon icon={option.icon} color={color} size={15} />}
                        <Text style={[styles.optionText, { color: color }]}>{option.label}</Text>
                    </Pressable>
                );
            })}
        </View>
    );
};

export default SegmentedControl;
