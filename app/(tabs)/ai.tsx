import React, { useState, useRef, useMemo, useCallback, useEffect } from "react";
import {
    View, Text, TouchableOpacity, Animated, ScrollView, Dimensions,
    useColorScheme, StyleSheet
} from "react-native";
import { Feather, Ionicons, MaterialIcons, FontAwesome5, FontAwesome } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import OrionIcon from "@/assets/svgs/orionIcon";
import { useRouter } from "expo-router";
import { CartesianChart, BarGroup, useChartPressState, Pie, PolarChart } from "victory-native";
import { Circle, useFont, Text as SKText } from "@shopify/react-native-skia";
import { useDerivedValue, useSharedValue, withTiming } from "react-native-reanimated";
import Credit from "@/assets/svgs/credit";
import Debit from "@/assets/svgs/debit";
import DonutChart from '@/components/DonutChart';
import RenderItem from '@/components/RenderItem';
import { useAuth } from "@/api/hooks/useAuth";

// Custom component to format analysis text beautifully
const FormattedAnalysis = ({ text }) => {
    // Split text into paragraphs
    if (!text) return null;
    const paragraphs = text.split('\n').filter(p => p.trim() !== '');
    return (
        <View style={styles.analysisContainer}>
            {paragraphs.map((paragraph, index) => {
                // Check if paragraph is a section header (starts with ** and ends with **)
                if (paragraph.includes('**') && paragraph.trim().startsWith('**')) {
                    const headerText = paragraph.replace(/\*\*/g, '');
                    return (
                        <View key={index} style={styles.headingContainer}>
                            <Text style={styles.heading}>{headerText}</Text>
                            <View style={styles.headingUnderline} />
                        </View>
                    );
                }

                // Check if paragraph is a bullet point
                else if (paragraph.trim().startsWith('* ')) {
                    const bulletContent = paragraph.substring(paragraph.indexOf('* ') + 2);

                    // Check if bullet point has bold text in it (like **Title:**)
                    if (bulletContent.includes('**')) {
                        const parts = [];
                        let lastIndex = 0;
                        let regex = /(\*\*)(.*?)(\*\*)/g;
                        let match;

                        while ((match = regex.exec(bulletContent)) !== null) {
                            // Add text before match
                            if (match.index > lastIndex) {
                                parts.push(
                                    <Text key={`${index}-${lastIndex}`} style={styles.bulletText}>
                                        {bulletContent.substring(lastIndex, match.index)}
                                    </Text>
                                );
                            }

                            // Add emphasized text
                            parts.push(
                                <Text key={`${index}-${match.index}`} style={styles.emphasisText}>
                                    {match[2]}
                                </Text>
                            );

                            lastIndex = match.index + match[0].length;
                        }

                        // Add remaining text
                        if (lastIndex < bulletContent.length) {
                            parts.push(
                                <Text key={`${index}-${lastIndex}`} style={styles.bulletText}>
                                    {bulletContent.substring(lastIndex)}
                                </Text>
                            );
                        }

                        return (
                            <View key={index} style={styles.bulletItem}>
                                <View style={styles.bulletPoint} />
                                <View style={styles.bulletTextContainer}>
                                    {parts}
                                </View>
                            </View>
                        );
                    } else {
                        return (
                            <View key={index} style={styles.bulletItem}>
                                <View style={styles.bulletPoint} />
                                <Text style={styles.bulletText}>{bulletContent}</Text>
                            </View>
                        );
                    }
                }

                // Handle sections that look like they have emphasized text (with ** markers)
                else if (paragraph.includes('**')) {
                    const formattedText = [];
                    let lastIndex = 0;
                    let regex = /(\*\*)(.*?)(\*\*)/g;
                    let match;

                    while ((match = regex.exec(paragraph)) !== null) {
                        // Add text before match
                        if (match.index > lastIndex) {
                            formattedText.push(
                                <Text key={`${index}-${lastIndex}`} style={styles.paragraph}>
                                    {paragraph.substring(lastIndex, match.index)}
                                </Text>
                            );
                        }

                        // Add emphasized text
                        formattedText.push(
                            <Text key={`${index}-${match.index}`} style={styles.emphasisText}>
                                {match[2]}
                            </Text>
                        );

                        lastIndex = match.index + match[0].length;
                    }

                    // Add remaining text
                    if (lastIndex < paragraph.length) {
                        formattedText.push(
                            <Text key={`${index}-${lastIndex}`} style={styles.paragraph}>
                                {paragraph.substring(lastIndex)}
                            </Text>
                        );
                    }

                    return (
                        <View key={index} style={styles.paragraphContainer}>
                            {formattedText}
                        </View>
                    );
                }

                // Regular paragraph
                else {
                    return (
                        <Text key={index} style={styles.paragraph}>
                            {paragraph}
                        </Text>
                    );
                }
            })}
        </View>
    );
};

const { width, height } = Dimensions.get("window"); // Get screen width

// Chart constants
const RADIUS = 160;
const STROKE_WIDTH = 30;
const OUTER_STROKE_WIDTH = 46;
const GAP = 0.04;

// Chart data
const chartData = [
    { x: "Jan", inflow: 7000, outflow: 4000 },
    { x: "Feb", inflow: 3000, outflow: 3500 },
    { x: "Mar", inflow: 2500, outflow: 3000 },
    { x: "Apr", inflow: 4000, outflow: 2500 },
    { x: "May", inflow: 3500, outflow: 4500 },
    { x: "Jun", inflow: 5000, outflow: 6000 },
    { x: "Jul", inflow: 7000, outflow: 6000 },
    { x: "Aug", inflow: 5000, outflow: 7000 },
];

const dataCategories = [
    { value: 6000, name: 'Books' },
    { value: 4000, name: 'Food' },
    { value: 3000, name: 'Family' },
    { value: 1000, name: 'Food' },
    { value: 10000, name: 'Salary' },
];

const n = dataCategories.length;

export default function AIDashboard() {
    // Get user data from auth context - MOVED THIS TO THE TOP OF THE COMPONENT
    const { user } = useAuth();

    // Now user is available for the rest of the component
    const [activeTab, setActiveTab] = useState("Summary");
    const translateX = useRef(new Animated.Value(0)).current; // Initial translateX
    const router = useRouter();

    const toggleTab = (tab) => {
        setActiveTab(tab);

        // Transition to the appropriate tab
        Animated.timing(translateX, {
            toValue: tab === "Summary" ? 0 : -width,
            duration: 300,
            useNativeDriver: true,
        }).start();
    };

    // Chart data and visualization logic
    const colorMode = useColorScheme();
    const inter = require("../../assets/fonts/SpaceMono-Regular.ttf");
    const toolTipFont = useFont(inter, 10);
    const font = useFont(inter, 9);
    const barColors = colorMode === "dark" ? ["#FF2728", "#008080"] : ["#FF2728", "#008080"];
    const { state, isActive } = useChartPressState({
        x: "",
        y: { inflow: 0, outflow: 0 },
    });

    // Tooltip value calculation
    const value = useDerivedValue(() => {
        const inflow = state.y.inflow.value.value;
        const outflow = state.y.outflow.value.value;
        const maxValue = Math.max(inflow, outflow);
        return `₦${maxValue}`;
    }, [state]);

    // Y-position of the tooltip
    const textYPosition = useDerivedValue(() => {
        const inflowY = state.y.inflow.position.value;
        const outflowY = state.y.outflow.position.value;
        const minY = Math.min(inflowY, outflowY);
        return minY - 17;
    }, [state]);

    // X-position of the tooltip
    const textXPosition = useDerivedValue(() => {
        if (!toolTipFont) {
            return 0;
        }
        return (
            state.x.position.value - toolTipFont.measureText(value.value).width / 2
        );
    }, [value, toolTipFont]);

    const generateRandomColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };

    const colors = useMemo(() => {
        return dataCategories.map(() => generateRandomColor());
    }, []);

    // Pie chart logic
    const [data, setData] = useState([]);
    // Shared Values for Reanimated
    const totalValue = useSharedValue(0);
    const decimals = useSharedValue([]);

    // Calculate percentage and prepare the data
    const total = dataCategories.reduce((acc, current) => acc + current.value, 0);
    const percentages = dataCategories.map((item) => (item.value / total) * 100);
    const decimalsValues = percentages.map((item) => item / 100);

    totalValue.value = withTiming(total, { duration: 1000 });
    decimals.value = [...decimalsValues];

    const arrayOfObjects = dataCategories.map((item, index) => ({
        value: item.value,
        name: item.name,
        percentage: percentages[index],
        color: colors[index],
    }));

    useEffect(() => {
        setData(arrayOfObjects);
    }, []);

    const smallFont = useFont(require("../../assets/fonts/SpaceMono-Regular.ttf"), 25);

    if (!font || !smallFont) {
        return <View />;
    }

    // Fallback content in case user.lastAnalysis is not available
    const fallbackAnalysis = "Dear Customer,\nThis report analyzes your transaction history from the past month (May 19th, 2025) and provides recommendations for improved financial health.  Please note that this analysis is based solely on the limited data provided. A more comprehensive analysis would require a longer transaction history.\n**1. Spending Pattern Analysis:**\nYour spending pattern shows two significant transfers totaling ₦4000 (₦2000 each) to \"fred adogo\" on May 19th, 2025.  The limited data prevents a comprehensive analysis of your spending habits beyond this single instance.  Further data is needed to identify recurring expenses, categorize spending, and create a detailed spending profile.\n**2. Savings Recommendations:**\nGiven the significant deposits of ₦120,000 and ₦700,000 on May 19th, 2025, a substantial opportunity for savings exists.  Without further transaction data to understand your regular expenses, it's difficult to give precise savings targets. However, I recommend exploring high-yield savings accounts or investment options to maximize the returns on your deposits.  Consider setting a savings goal—perhaps a percentage of your income (once regular income patterns are established)—and automate transfers to your savings account.\n**3. Potential Budget Optimizations:**\nWith the limited data, specific budget optimization strategies are challenging to recommend. However,  tracking your spending meticulously (once more data is available) will reveal areas for potential cost reduction.  This might involve identifying non-essential expenses and reducing them or finding more affordable alternatives.\n**4. Financial Health Assessment:**\nBased on the available data, your financial health appears to be positive due to the large deposits. However, this is a very preliminary assessment. A more comprehensive assessment requires a longer transaction history to accurately assess your income, expenses, debts, and overall financial obligations.  The two transfers to \"fred adogo\" suggest potential regular expenses, and a better understanding of the nature of these payments is necessary.\n**Recommendations for Improvement:**\n* **Maintain Detailed Records:**  Keep meticulous records of all your income and expenses.  This will provide a more accurate picture of your financial situation.\n* **Create a Budget:** Develop a detailed budget that categorizes your spending and tracks your progress toward your financial goals.\n* **Seek Professional Advice:**  Consider consulting with a financial advisor for personalized advice tailored to your specific financial situation and long-term goals.  This report is based on limited information and should not be considered a substitute for professional financial guidance.\nThis report provides a preliminary assessment.  Providing a longer transaction history will allow for a more comprehensive and accurate analysis and personalized financial recommendations.";

    return (
        <SafeAreaView style={styles.container}>
            {/* Header with App Name */}
            <View style={styles.header}>
                <View style={styles.headerLeft}>
                    <TouchableOpacity onPress={() => router.back()}>
                        <Ionicons name="chevron-back" size={24} color="#333" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Financial AI</Text>
                </View>
                <View style={styles.headerRight}>
                    <TouchableOpacity style={styles.avatarButton}>
                        <FontAwesome name="user-circle" size={28} color="#008080" />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Tabs */}
            <View style={styles.tabContainer}>
                <TouchableOpacity
                    style={[styles.tabButton, activeTab === "Summary" && styles.activeTabButton]}
                    onPress={() => toggleTab("Summary")}
                >
                    <Text style={[styles.tabText, activeTab === "Summary" && styles.activeTabText]}>
                        AI Summary
                    </Text>
                    {activeTab === "Summary" && <View style={styles.activeIndicator} />}
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.tabButton, activeTab === "Analytics" && styles.activeTabButton]}
                    onPress={() => toggleTab("Analytics")}
                >
                    <Text style={[styles.tabText, activeTab === "Analytics" && styles.activeTabText]}>
                        Analytics
                    </Text>
                    {activeTab === "Analytics" && <View style={styles.activeIndicator} />}
                </TouchableOpacity>
            </View>

            {/* Animated View Container */}
            <View style={styles.contentContainer}>
                <Animated.View
                    style={[
                        styles.animatedContent,
                        { transform: [{ translateX }] }
                    ]}
                >
                    {/* AI Summary Screen */}
                    <View style={styles.screenContainer}>
                        <ScrollView
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={styles.scrollContent}
                        >
                            {/* AI Insight Card */}
                            <View style={styles.mainCard}>
                                <View style={styles.cardHeader}>
                                    <View style={styles.cardHeaderLeft}>
                                        <View style={styles.cardIcon}>
                                            <FontAwesome5 name="chart-line" size={18} color="#fff" />
                                        </View>
                                        <Text style={styles.cardTitle}>Financial Analysis Report</Text>
                                    </View>
                                    <Text style={styles.cardDate}>May 19, 2025</Text>
                                </View>

                                <View style={styles.cardContent}>
                                    {/* Use user?.lastAnalysis if available, otherwise use fallback */}
                                    <FormattedAnalysis text={user?.lastAnalysis || fallbackAnalysis} />
                                </View>
                            </View>

                            {/* Spacer for the bottom button */}
                            <View style={{ height: 80 }} />
                        </ScrollView>

                        {/* AI Chat Button */}
                        <TouchableOpacity
                            style={styles.chatButton}
                            onPress={() => router.push('/ai-chat')}
                        >
                            <View style={styles.chatButtonIcon}>
                                <OrionIcon width={25} height={25} />
                            </View>
                            <Text style={styles.chatButtonText}>Start AI Chat</Text>
                            <Feather name="chevron-right" size={25} color="white" />
                        </TouchableOpacity>
                    </View>

                    {/* Analytics Screen */}
                    <View style={styles.screenContainer}>
                        <ScrollView
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={styles.scrollContent}
                        >
                            {/* Analytics Content */}
                            <View style={styles.analyticsContainer}>
                                <View style={styles.filterRow}>
                                    <TouchableOpacity style={styles.filterButton}>
                                        <Text style={styles.filterButtonText}>Monthly</Text>
                                        <Feather name="chevron-down" color="white" size={20} />
                                    </TouchableOpacity>

                                    <View style={styles.legendContainer}>
                                        <View style={styles.legendItem}>
                                            <Credit width={20} height={20} />
                                            <Text style={styles.legendText}>Income</Text>
                                        </View>

                                        <View style={styles.legendItem}>
                                            <Debit width={20} height={20} />
                                            <Text style={styles.legendText}>Expenses</Text>
                                        </View>
                                    </View>
                                </View>

                                {/* Date Range Indicator */}
                                <View style={styles.dateRangeContainer}>
                                    <Text style={styles.dateRangeText}>Jan 23-Jan 30</Text>
                                </View>

                                {/* Chart */}
                                <View style={styles.chartWrapper}>
                                    <CartesianChart
                                        data={chartData}
                                        xKey="x"
                                        yKeys={["outflow", "inflow"]}
                                        domain={{ y: [1000, 8000] }}
                                        domainPadding={{ left: 50, right: 50, top: 10 }}
                                        axisOptions={{
                                            font,
                                            tickCount: chartData.length,
                                            formatXLabel: (val) =>
                                                typeof val === "string" ? val : chartData[val]?.x || "",
                                            labelOffset: 5,
                                            labelColor: "black",
                                        }}
                                        chartPressState={state}
                                    >
                                        {({ points, chartBounds }) => (
                                            <>
                                                <BarGroup
                                                    chartBounds={chartBounds}
                                                    betweenGroupPadding={0.2}
                                                    withinGroupPadding={0.3}
                                                    barWidth={8}
                                                    roundedCorners={{
                                                        topLeft: 10,
                                                        topRight: 10,
                                                    }}
                                                >
                                                    {/* Inflow Bar */}
                                                    <BarGroup.Bar
                                                        points={points.inflow}
                                                        color={barColors[0]}
                                                        animate={{ type: "timing", duration: 1000 }}
                                                    />
                                                    {/* Outflow Bar */}
                                                    <BarGroup.Bar
                                                        points={points.outflow}
                                                        color={barColors[1]}
                                                        animate={{ type: "timing", duration: 1000 }}
                                                    />
                                                </BarGroup>

                                                {isActive ? (
                                                    <>
                                                        <SKText
                                                            font={toolTipFont}
                                                            color={"black"}
                                                            x={textXPosition}
                                                            y={textYPosition}
                                                            text={value}
                                                        />
                                                    </>
                                                ) : null}
                                            </>
                                        )}
                                    </CartesianChart>
                                </View>

                                {/* Savings Trends */}
                                <View style={styles.sectionHeader}>
                                    <Text style={styles.sectionTitle}>Savings Trends</Text>
                                </View>

                                <View style={styles.savingsContainer}>
                                    <View style={styles.savingsHeader}>
                                        <Text style={styles.savingsLabel}>Total saved</Text>
                                        <Text style={styles.savingsAmount}>₦ {total}</Text>
                                    </View>
                                </View>

                                {/* Pie Chart */}
                                <View style={styles.pieChartContainer}>
                                    <View style={styles.donutChartContainer}>
                                        <DonutChart
                                            radius={RADIUS}
                                            gap={GAP}
                                            strokeWidth={STROKE_WIDTH}
                                            outerStrokeWidth={OUTER_STROKE_WIDTH}
                                            font={font}
                                            smallFont={smallFont}
                                            totalValue={totalValue}
                                            n={n}
                                            decimals={decimals}
                                            colors={colors}
                                            offsetY={20}
                                        />
                                    </View>

                                    {/* Legend */}
                                    <View style={styles.pieLegendContainer}>
                                        {data.map((item, index) => (
                                            <View key={index} style={styles.pieLegendItem}>
                                                <View style={[styles.colorCircle, { backgroundColor: item.color }]} />
                                                <Text style={styles.pieLegendText}>
                                                    {item.percentage.toFixed(1)}% - {item.name}
                                                </Text>
                                            </View>
                                        ))}
                                    </View>
                                </View>
                            </View>
                        </ScrollView>
                    </View>
                </Animated.View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f9f9',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerTitle: {
        marginLeft: 8,
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
    },
    headerRight: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatarButton: {
        width: 36,
        height: 36,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 18,
    },
    tabContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
        marginBottom: 8,
    },
    tabButton: {
        paddingVertical: 12,
        paddingHorizontal: 20,
        position: 'relative',
    },
    activeTabButton: {
        borderBottomWidth: 0,
    },
    activeIndicator: {
        position: 'absolute',
        bottom: -1,
        left: 0,
        right: 0,
        height: 3,
        backgroundColor: '#008080',
        borderTopLeftRadius: 2,
        borderTopRightRadius: 2,
    },
    tabText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#777',
    },
    activeTabText: {
        color: '#008080',
        fontWeight: '600',
    },
    contentContainer: {
        flex: 1,
        overflow: 'hidden',
    },
    animatedContent: {
        flexDirection: 'row',
        width: width * 2,
        height: '100%',
    },
    screenContainer: {
        width,
        height: '100%',
        position: 'relative',
    },
    scrollContent: {
        flexGrow: 1,
        paddingHorizontal: 16,
        paddingBottom: 100,
    },

    // Main Analysis Card
    mainCard: {
        backgroundColor: '#fff',
        borderRadius: 12,
        marginTop: 16,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        overflow: 'hidden',
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 16,
        backgroundColor: '#f0f9f9',
        borderBottomWidth: 1,
        borderBottomColor: '#e0f2f2',
    },
    cardHeaderLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    cardIcon: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: '#008080',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#008080',
    },
    cardDate: {
        fontSize: 12,
        color: '#666',
    },
    cardContent: {
        padding: 16,
    },

    // Analysis Formatting
    analysisContainer: {
        marginVertical: 8,
    },
    headingContainer: {
        marginBottom: 12,
        marginTop: 16,
    },
    heading: {
        fontSize: 16,
        fontWeight: '700',
        color: '#008080',
        marginBottom: 4,
    },
    headingUnderline: {
        height: 2,
        width: 40,
        backgroundColor: '#008080',
        marginTop: 2,
        marginBottom: 6,
    },
    paragraph: {
        fontSize: 14,
        lineHeight: 21,
        color: '#333',
        marginBottom: 12,
    },
    paragraphContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 12,
    },
    emphasisText: {
        fontSize: 14,
        lineHeight: 21,
        fontWeight: '700',
        color: '#008080',
    },
    bulletItem: {
        flexDirection: 'row',
        marginBottom: 12,
        paddingRight: 8,
        alignItems: 'flex-start',
    },
    bulletPoint: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: '#008080',
        marginTop: 8,
        marginRight: 10,
    },
    bulletTextContainer: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    bulletText: {
        flex: 1,
        fontSize: 14,
        lineHeight: 21,
        color: '#333',
    },

    // Chat Button
    chatButton: {
        position: 'absolute',
        bottom: 16,
        left: 16,
        right: 16,
        backgroundColor: '#008080',
        borderRadius: 12,
        paddingVertical: 14,
        paddingHorizontal: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 5,
    },
    chatButtonIcon: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    chatButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
        flex: 1,
        textAlign: 'center',
    },

    // Analytics Styling
    analyticsContainer: {
        flex: 1,
    },
    filterRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 16,
    },
    filterButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#008080',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 8,
    },
    filterButtonText: {
        color: '#fff',
        fontSize: 14,
        marginRight: 8,
    },
    legendContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
    },
    legendItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    legendText: {
        fontSize: 12,
        color: '#666',
    },
    dateRangeContainer: {
        backgroundColor: '#008080',
        paddingVertical: 4,
        paddingHorizontal: 12,
        borderRadius: 16,
        alignSelf: 'flex-start',
        marginBottom: 16,
    },
    dateRangeText: {
        color: '#fff',
        fontSize: 12,
    },
    chartWrapper: {
        borderWidth: 1,
        borderColor: '#e0e0e0',
        borderRadius: 12,
        padding: 16,
        marginBottom: 24,
        backgroundColor: '#fff',
        height: 200,
    },
    sectionHeader: {
        marginVertical: 16,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
    },
    savingsContainer: {
        marginBottom: 16,
    },
    savingsHeader: {
        marginBottom: 8,
    },
    savingsLabel: {
        fontSize: 18,
        color: '#666',
        marginBottom: 4,
    },
    savingsAmount: {
        fontSize: 24,
        fontWeight: '700',
        color: '#333',
    },
    pieChartContainer: {
        alignItems: 'center',
        marginBottom: 24,
    },
    donutChartContainer: {
        width: RADIUS * 2,
        height: RADIUS * 2,
        marginTop: 16,
        marginBottom: 16,
    },
    pieLegendContainer: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        width: '100%',
        gap: 8,
    },
    pieLegendItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
    },
    colorCircle: {
        width: 12,
        height: 12,
        borderRadius: 6,
        marginRight: 8,
    },
    pieLegendText: {
        fontSize: 14,
        color: '#333',
    },
});