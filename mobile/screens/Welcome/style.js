import { StyleSheet } from "react-native";

const createStyles = (theme) => StyleSheet.create({
    scrollContent: {
        flexGrow: 1,
        paddingBottom: 24,
    },
    heroContainer: {
        flex: 1,
        minHeight: 260,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        height: 88,
        width: 88,
        borderRadius: 22,
    },
    appName: {
        marginTop: 20,
        fontSize: 44,
        fontWeight: 'bold',
        letterSpacing: -0.5,
        color: theme.colors.text,
    },
    tagline: {
        marginTop: 8,
        maxWidth: 280,
        fontSize: 17,
        lineHeight: 24,
        textAlign: 'center',
        color: theme.colors.secondaryText,
    },
    featuresCard: {
        padding: 20,
        gap: 20,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: theme.colors.border,
        backgroundColor: theme.colors.card,
    },
    featureRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 14,
    },
    featureIconContainer: {
        height: 44,
        width: 44,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.colors.primaryLight,
    },
    featureTextContainer: {
        flex: 1,
        gap: 2,
    },
    featureTitle: {
        fontSize: 16,
        fontWeight: 600,
        color: theme.colors.text,
    },
    featureDescription: {
        fontSize: 14,
        lineHeight: 19,
        color: theme.colors.secondaryText,
    },
    menu: {
        marginTop: 32,
        gap: 8,
    },
    loginButton: {
        height: 48,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loginText: {
        fontSize: 16,
        fontWeight: 600,
        color: theme.colors.primary,
    },
});

export default createStyles;
