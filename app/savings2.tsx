import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    StatusBar,
    Image,
    ScrollView
} from 'react-native';
import { AntDesign, Feather, Octicons } from '@expo/vector-icons';
import {useRouter} from "expo-router";
import {SafeAreaView} from "react-native-safe-area-context";
export default function SavingsDetailsScreen({ navigation }) {
    const [contributeMethod, setContributeMethod] = useState('automatically');
const router = useRouter()
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <AntDesign name="left" size={24} color="#000" />
                    <Text style={styles.backText}>Saving</Text>
                </TouchableOpacity>
            </View>

            <ScrollView style={styles.scrollView}>
                {/* Instructions */}
                <Text style={styles.instructionText}>
                    Setup your flexible saving plans, please provide the following required information.
                </Text>

                {/* Progress Bar */}
                <View style={styles.progressContainer}>
                    <View style={styles.progressBarInactive} />
                    <View style={styles.progressBarActive} />
                    <View style={styles.progressBarInactive} />
                </View>

                {/* Section Title */}
                <Text style={styles.sectionTitle}>Other Details</Text>

                {/* Contribution Method */}
                <View style={styles.detailsContainer}>
                    <Text style={styles.contributionLabel}>How do you want to contribute?</Text>

                    <View style={styles.radioContainer}>
                        <TouchableOpacity
                            style={styles.radioOption}
                            onPress={() => setContributeMethod('automatically')}
                        >
                            <View style={[
                                styles.radioButton,
                                contributeMethod === 'automatically' && styles.radioButtonActive
                            ]}>
                                {contributeMethod === 'automatically' && (
                                    <View style={styles.radioButtonInner} />
                                )}
                            </View>
                            <Text style={styles.radioText}>Automatically</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.radioOption}
                            onPress={() => setContributeMethod('manually')}
                        >
                            <View style={[
                                styles.radioButton,
                                contributeMethod === 'manually' && styles.radioButtonActive
                            ]}>
                                {contributeMethod === 'manually' && (
                                    <View style={styles.radioButtonInner} />
                                )}
                            </View>
                            <Text style={styles.radioText}>Manually</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Alert */}
                    {contributeMethod === 'automatically' && (
                        <View style={styles.alertContainer}>
                            <Octicons name="alert" size={22} color="#F59E0B" />
                            <Text style={styles.alertText}>
                                You will be debited automatically every last day of thr month at 8:00am.
                            </Text>
                        </View>
                    )}
                </View>

                {/* Source of Funds */}
                <View style={styles.detailsContainer}>
                    <Text style={styles.sourceLabel}>Source of Funds</Text>

                    <View style={styles.accountContainer}>
                        {/*<Image*/}
                        {/*    source={require('./assets/svgs/customercare.tsx')}*/}
                        {/*    style={styles.profileImage}*/}
                        {/*/>*/}
                        <View style={styles.accountDetails}>
                            <Text style={styles.accountName}>JOHN DOE EMMANUEL</Text>
                            <Text style={styles.accountNumber}>Account No: 67898908900</Text>
                            <Text style={styles.accountBalance}>Balance: 50,000</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>

            {/* Bottom Buttons */}
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.backButton2}
                    onPress={() => router.back()}
                >
                    <Text style={styles.backButtonText}>Back</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.nextButton}
                    onPress={() => router.push('/savings3')}
                >
                    <Text style={styles.nextButtonText}>Next</Text>
                </TouchableOpacity>
            </View>

            {/* Bottom Indicator */}
            <View style={styles.bottomIndicatorContainer}>
                <View style={styles.bottomIndicator} />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#E5E7EB',
    },
    backButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    backText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 4,
    },
    scrollView: {
        flex: 1,
        paddingHorizontal: 20,
    },
    instructionText: {
        fontSize: 16,
        color: '#6B7280',
        marginTop: 20,
        marginBottom: 20,
    },
    progressContainer: {
        flexDirection: 'row',
        marginBottom: 24,
    },
    progressBarActive: {
        flex: 1,
        height: 4,
        backgroundColor: '#0C8D7D',
        borderRadius: 2,
        marginRight: 4,
    },
    progressBarInactive: {
        flex: 1,
        height: 4,
        backgroundColor: '#E5E7EB',
        borderRadius: 2,
        marginRight: 4,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    detailsContainer: {
        backgroundColor: '#F9FAFB',
        borderRadius: 8,
        padding: 16,
        marginBottom: 20,
    },
    contributionLabel: {
        fontSize: 16,
        fontWeight: '500',
        marginBottom: 16,
    },
    radioContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginBottom: 16,
    },
    radioOption: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 36,
    },
    radioButton: {
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#D1D5DB',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 8,
    },
    radioButtonActive: {
        borderColor: '#0C8D7D',
    },
    radioButtonInner: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: '#0C8D7D',
    },
    radioText: {
        fontSize: 16,
        color: '#1F2937',
    },
    alertContainer: {
        flexDirection: 'row',
        backgroundColor: '#FEF3C7',
        borderRadius: 8,
        padding: 12,
        alignItems: 'flex-start',
    },
    alertText: {
        fontSize: 14,
        color: '#92400E',
        marginLeft: 12,
        flex: 1,
    },
    sourceLabel: {
        fontSize: 16,
        fontWeight: '500',
        marginBottom: 16,
    },
    accountContainer: {
        flexDirection: 'row',
        backgroundColor: '#EFF6F6',
        borderRadius: 8,
        padding: 12,
        alignItems: 'center',
    },
    profileImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 12,
    },
    accountDetails: {
        flex: 1,
    },
    accountName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#1F2937',
    },
    accountNumber: {
        fontSize: 14,
        color: '#4B5563',
        marginTop: 4,
    },
    accountBalance: {
        fontSize: 14,
        color: '#4B5563',
        marginTop: 2,
    },
    buttonContainer: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        paddingTop: 16,
        paddingBottom: 16,
    },
    backButton2: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#D1D5DB',
        borderRadius: 8,
        paddingVertical: 14,
        marginRight: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    backButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1F2937',
    },
    nextButton: {
        flex: 1,
        backgroundColor: '#0C8D7D',
        borderRadius: 8,
        paddingVertical: 14,
        alignItems: 'center',
        justifyContent: 'center',
    },
    nextButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#FFFFFF',
    },
    bottomIndicatorContainer: {
        alignItems: 'center',
        paddingBottom: 24,
    },
    bottomIndicator: {
        width: 40,
        height: 5,
        backgroundColor: '#000000',
        borderRadius: 2.5,
    },
});