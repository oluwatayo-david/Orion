import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StatusBar,
    ScrollView,
    Pressable
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {SafeAreaView} from "react-native-safe-area-context";
import {useRouter} from "expo-router";
export default function SavingsScreen() {
    const [selectedOption, setSelectedOption] = useState('target');
    const [frequency, setFrequency] = useState('Weekly');
 const router =useRouter()
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <Ionicons name="chevron-back" size={24} color="#000" />
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
                    <View style={styles.progressBarActive} />
                    <View style={styles.progressBarInactive} />
                    <View style={styles.progressBarInactive} />
                </View>

                {/* Saving Purpose */}
                <Text style={styles.sectionTitle}>What are you saving towards?</Text>
                <View style={styles.optionsContainer}>
                    <TouchableOpacity
                        style={[
                            styles.optionCard,
                            selectedOption === 'target' && styles.activeOptionCard
                        ]}
                        onPress={() => setSelectedOption('target')}
                    >
                        <View style={styles.targetIconContainer}>
                            <Ionicons name="checkmark-circle-outline" size={28} color="#000" />
                        </View>
                        <Text style={styles.optionText}>I have a target</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[
                            styles.optionCard,
                            selectedOption === 'general' && styles.activeOptionCard
                        ]}
                        onPress={() => setSelectedOption('general')}
                    >
                        <View style={styles.targetIconContainer}>
                            <Ionicons name="cash-outline" size={28} color="#fff" />
                        </View>
                        <Text style={styles.optionTextWhite}>Nothing, I'm just saving</Text>
                    </TouchableOpacity>
                </View>

                {/* Target Name */}
                <Text style={styles.fieldLabel}>Target Name</Text>
                <TextInput
                    style={styles.textInput}
                    placeholder="Plan Name"
                    placeholderTextColor="#4B5563"
                />

                {/* Target Date Section */}
                <Text style={styles.fieldLabel}>What's your target date?</Text>
                <TextInput
                    style={styles.textInput}
                    placeholder="Target Date"
                    placeholderTextColor="#4B5563"
                />
                <TextInput
                    style={styles.textInput}
                    placeholder="Start Date"
                    placeholderTextColor="#4B5563"
                />

                {/* Amount Section */}
                <Text style={styles.fieldLabel}>What's your target date?</Text>
                <View style={styles.amountSection}>
                    <Text style={styles.amountLabel}>How much are you aiming for?</Text>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Amount"
                        placeholderTextColor="#4B5563"
                        keyboardType="numeric"
                    />

                    <Text style={styles.amountLabel}>How often do you want to save?</Text>
                    <TouchableOpacity style={styles.dropdownContainer}>
                        <Text style={styles.dropdownText}>{frequency}</Text>
                        <Ionicons name="chevron-down" size={24} color="#000" />
                    </TouchableOpacity>
                </View>
            </ScrollView>

            {/* Next Button */}
            <View style={styles.bottomContainer}>
                <TouchableOpacity style={styles.nextButton} onPress={()=>{
                    router.push('/savings2')
                }}>
                    <Text style={styles.nextButtonText}>Next</Text>
                </TouchableOpacity>

                {/* Bottom Indicator */}
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
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    optionsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 24,
    },
    optionCard: {
        width: '48%',
        backgroundColor: '#D1E8E5',
        padding: 20,
        borderRadius: 12,
        height: 130,
        justifyContent: 'space-between',
    },
    activeOptionCard: {
        backgroundColor: '#0C8D7D',
    },
    targetIconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    optionText: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 8,
    },
    optionTextWhite: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 8,
        color: '#fff',
    },
    fieldLabel: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 12,
        marginTop: 8,
    },
    textInput: {
        backgroundColor: '#f0f5f5',
        paddingVertical: 16,
        paddingHorizontal: 12,
        borderRadius: 8,
        fontSize: 16,
        marginBottom: 12,
    },
    amountSection: {
        backgroundColor: '#F9FAFB',
        borderRadius: 8,
        padding: 16,
        marginTop: 8,
        marginBottom: 24,
    },
    amountLabel: {
        fontSize: 15,
        marginBottom: 8,
    },
    dropdownContainer: {
        backgroundColor: '#f0f5f5',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 16,
        paddingHorizontal: 12,
        borderRadius: 8,
        marginBottom: 8,
    },
    dropdownText: {
        fontSize: 16,
    },
    bottomContainer: {
        paddingHorizontal: 20,
        paddingBottom: 30,
        alignItems: 'center',
    },
    nextButton: {
        backgroundColor: '#0C8D7D',
        width: '100%',
        paddingVertical: 16,
        borderRadius: 8,
        marginBottom: 24,
        alignItems: 'center',
    },
    nextButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    bottomIndicator: {
        width: 40,
        height: 5,
        backgroundColor: '#000',
        borderRadius: 3,
    },
});