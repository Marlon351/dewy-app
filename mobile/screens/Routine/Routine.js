import React, { useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "@react-navigation/native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import AppScreen from "../../components/AppScreen/AppScreen";
import SegmentedControl from "../../components/SegmentedControl/SegmentedControl";
import StepModal from "../../components/StepModal/StepModal";
import MenuButton from "../../components/MenuButton/MenuButton";
import { addStep, deleteStep, moveStep, updateStep } from "../../redux/reducers/routineSlice";
import { formatDays } from "../../utils/progress";
import { getStepEmoji } from "../../utils/emojis";
import createStyles from "./style";

const Routine = ({navigation}) => {
    const [period, setPeriod] = useState("am");
    const [modalVisible, setModalVisible] = useState(false);
    const [editingStep, setEditingStep] = useState(null);
    const steps = useSelector(state => state.persist.routine[period]);
    const dispatch = useDispatch();
    const theme = useTheme();
    const styles = createStyles(theme);

    const periodOptions = [
        { label: "Morning", value: "am", emoji: "☀️", color: theme.colors.morning },
        { label: "Evening", value: "pm", emoji: "🌙", color: theme.colors.evening },
    ];
    const periodColor = period === "am" ? theme.colors.morning : theme.colors.evening;
    const periodLightColor = period === "am" ? theme.colors.morningLight : theme.colors.eveningLight;

    const openStepModal = (step) => {
        setEditingStep(step);
        setModalVisible(true);
    };

    const handleSave = (step) => {
        if (editingStep) {
            dispatch(updateStep({ period, step }));
        }
        else {
            dispatch(addStep(period, step));
        }
        setModalVisible(false);
    };

    const handleDelete = () => {
        dispatch(deleteStep({ period, id: editingStep.id }));
        setModalVisible(false);
    };

    const reorderButton = (icon, index, direction) => {
        const isDisabled = index + direction < 0 || index + direction >= steps.length;
        return (
            <Pressable hitSlop={8} disabled={isDisabled} onPress={() => dispatch(moveStep({ period, index, direction }))}>
                <FontAwesomeIcon icon={icon} color={isDisabled ? theme.colors.border : theme.colors.secondaryText} size={14} />
            </Pressable>
        );
    };

    return (
        <AppScreen>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                <Text style={styles.title}>My Routine 🧴</Text>
                <Text style={styles.subtitle}>Build the steps you'll check off each day</Text>

                <View style={styles.segmentedControlContainer}>
                    <SegmentedControl options={periodOptions} selectedValue={period} onChange={(value) => setPeriod(value)} />
                </View>

                <View style={[styles.summaryCard, { backgroundColor: periodLightColor }]}>
                    <Text style={styles.summaryEmoji}>{period === "am" ? "🌅" : "🌌"}</Text>
                    <View style={styles.summaryTextContainer}>
                        <Text style={[styles.summaryTitle, { color: periodColor }]}>{steps.length} {steps.length === 1 ? "step" : "steps"}</Text>
                        <Text style={styles.summaryText}>{period === "am" ? "Protect and prep your skin for the day" : "Repair and restore while you sleep"}</Text>
                    </View>
                </View>
                {steps.length === 0 ?
                    <View style={styles.emptyCard}>
                        <Text style={styles.emptyText}>🫧 No {period === "am" ? "morning" : "evening"} steps yet. Add your first one below.</Text>
                    </View>
                    :
                    <View style={styles.stepsContainer}>
                        {steps.map((step, index) => (
                            <Pressable key={step.id} style={styles.stepCard} onPress={() => openStepModal(step)}>
                                <View style={[styles.stepEmojiContainer, { backgroundColor: periodLightColor }]}>
                                    <Text style={styles.stepEmoji}>{getStepEmoji(step.name)}</Text>
                                </View>
                                <View style={styles.stepTextContainer}>
                                    <Text style={[styles.stepNumberText, { color: periodColor }]}>STEP {index + 1}</Text>
                                    <Text style={styles.stepName}>{step.name}</Text>
                                    {step.product !== "" && <Text style={styles.stepProduct}>{step.product}</Text>}
                                    <Text style={styles.stepDays}>{formatDays(step.days)}</Text>
                                </View>
                                <View style={styles.reorderContainer}>
                                    {reorderButton(faChevronUp, index, -1)}
                                    {reorderButton(faChevronDown, index, 1)}
                                </View>
                            </Pressable>
                        ))}
                    </View>
                }

                <View style={styles.addButtonContainer}>
                    <MenuButton label={"+ Add Step"} color={periodColor} onPress={() => openStepModal(null)} />
                </View>
            </ScrollView>

            <StepModal visible={modalVisible} step={editingStep} color={periodColor} onSave={(step) => handleSave(step)} onDelete={() => handleDelete()} onClose={() => setModalVisible(false)} />
        </AppScreen>
    );
};

export default Routine;
