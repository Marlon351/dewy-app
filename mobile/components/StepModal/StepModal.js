import React, { useEffect, useState } from "react";
import { Modal, Pressable, ScrollView, Text, View } from "react-native";
import { useTheme } from "@react-navigation/native";
import AuthenticationInput from "../AuthenticationInput/AuthenticationInput";
import MenuButton from "../MenuButton/MenuButton";
import { dayInitials, everyDay, formatDays } from "../../utils/progress";
import { getStepEmoji } from "../../utils/emojis";
import createStyles from "./style";

const suggestedSteps = ["Cleanser", "Toner", "Serum", "Vitamin C Serum", "Moisturizer", "Sunscreen", "Exfoliant", "Retinol", "Eye Cream", "Face Mask"];

const StepModal = ({
    visible,
    step,
    color,
    onSave = () => {},
    onDelete = () => {},
    onClose = () => {},
}) => {
    const [name, setName] = useState("");
    const [product, setProduct] = useState("");
    const [days, setDays] = useState(everyDay);
    const theme = useTheme();
    const styles = createStyles(theme);
    const canSave = name.trim() !== "" && days.length > 0;
    const accentColor = color ?? theme.colors.primary;

    // Reset the form each time the modal opens
    useEffect(() => {
        if (visible) {
            setName(step?.name ?? "");
            setProduct(step?.product ?? "");
            setDays(step?.days ?? everyDay);
        }
    }, [visible, step]);

    const toggleDay = (day) => {
        setDays(days.includes(day) ? days.filter(existingDay => existingDay !== day) : [...days, day]);
    };

    const handleSave = () => {
        onSave({ ...step, name: name.trim(), product: product.trim(), days: [...days].sort() });
    };

    return (
        <Modal visible={visible} animationType="slide" presentationStyle="pageSheet" onRequestClose={() => onClose()}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Pressable hitSlop={10} onPress={() => onClose()}>
                        <Text style={styles.headerButtonText}>Cancel</Text>
                    </Pressable>
                    <Text style={styles.title}>{name.trim() ? `${getStepEmoji(name)} ` : ""}{step ? "Edit Step" : "Add Step"}</Text>
                    <Pressable hitSlop={10} disabled={!canSave} onPress={() => handleSave()}>
                        <Text style={[styles.headerButtonText, styles.saveText, { color: accentColor }, !canSave && styles.disabledText]}>Save</Text>
                    </Pressable>
                </View>

                <ScrollView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
                    <Text style={styles.sectionHeader}>STEP</Text>
                    <AuthenticationInput value={name} placeholder={"e.g. Cleanser"} onChangeText={(text) => setName(text)} />
                    <View style={styles.chipsContainer}>
                        {suggestedSteps.map(suggestion => (
                            <Pressable key={suggestion} style={[styles.chip, name === suggestion && { borderColor: accentColor }]} onPress={() => setName(suggestion)}>
                                <Text style={[styles.chipText, name === suggestion && [styles.chipTextSelected, { color: accentColor }]]}>{getStepEmoji(suggestion)} {suggestion}</Text>
                            </Pressable>
                        ))}
                    </View>

                    <Text style={styles.sectionHeader}>PRODUCT</Text>
                    <AuthenticationInput value={product} placeholder={"Optional, e.g. CeraVe Hydrating Cleanser"} onChangeText={(text) => setProduct(text)} />

                    <Text style={styles.sectionHeader}>DAYS</Text>
                    <View style={styles.daysContainer}>
                        {everyDay.map(day => (
                            <Pressable key={day} style={[styles.day, days.includes(day) && { borderColor: accentColor, backgroundColor: accentColor }]} onPress={() => toggleDay(day)}>
                                <Text style={[styles.dayText, days.includes(day) && styles.dayTextSelected]}>{dayInitials[day]}</Text>
                            </Pressable>
                        ))}
                    </View>
                    <Text style={styles.daysHint}>{days.length > 0 ? formatDays(days) : "Pick at least one day"}</Text>

                    {step &&
                        <View style={styles.deleteButtonContainer}>
                            <MenuButton label={"Delete Step"} variant={"outlined"} color={theme.colors.error} onPress={() => onDelete()} />
                        </View>
                    }
                </ScrollView>
            </View>
        </Modal>
    );
};

export default StepModal;
