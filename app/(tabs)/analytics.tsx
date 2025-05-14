import React, {useState, useEffect, useMemo, useCallback} from "react";
import { CartesianChart, BarGroup, useChartPressState, Pie, PolarChart  } from "victory-native";
import { Circle, useFont, Text as SKText } from "@shopify/react-native-skia";
import {View, useColorScheme, Text, ScrollView, TouchableOpacity,  StyleSheet} from "react-native";
import { useDerivedValue , useSharedValue, withTiming } from "react-native-reanimated";
import {Feather, Ionicons} from "@expo/vector-icons";
import {SafeAreaView} from "react-native-safe-area-context";
import Credit from "@/assets/svgs/credit";
import Debit from "@/assets/svgs/debit";
import DonutChart from '@/components/DonutChart';
import RenderItem from '@/components/RenderItem';

const DATA = [
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

const lightenColor = (hex: string, amount: number) => {
    let col = hex.replace("#", "");
    const num = parseInt(col, 16);

    let r = (num >> 16) + amount;
    let g = ((num >> 8) & 0x00FF) + amount;
    let b = (num & 0x0000FF) + amount;

    r = Math.min(255, r);
    g = Math.min(255, g);
    b = Math.min(255, b);

    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
};




const RADIUS = 160;
const STROKE_WIDTH = 30;
const OUTER_STROKE_WIDTH = 46;
const GAP = 0.04;


    const n = dataCategories.length;





const inter = require("../../assets/fonts/SpaceMono-Regular.ttf");

export default function AnalyticsScreen() {
    const [chartData, setChartData] = useState(DATA);
    const colorMode = useColorScheme();
    const toolTipFont = useFont(inter, 10);
    const font = useFont(inter, 9);
    const barColors =
        colorMode === "dark" ? ["#FF2728", "#008080"] : ["#FF2728", "#008080"];
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


    {/*pie chart logic */}
    const [data, setData] = useState<any[]>([]);
    // Shared Values for Reanimated
    const totalValue = useSharedValue(0);
    const decimals = useSharedValue<number[]>([]);

    // Generate random shades for the donut chart

    // Calculate percentage and prepare the data
    const total = dataCategories.reduce((acc, current) => acc + current.value, 0);
    const percentages = dataCategories.map((item) => (item.value / total) * 100);
    const decimalsValues = percentages.map((item) => item / 100);

    totalValue.value = withTiming(total, { duration: 1000 });
    decimals.value = [...decimalsValues];

    const arrayOfObjects =
        dataCategories.map((item, index) => ({
        value: item.value,
            name : item.name,
        percentage: percentages[index],
        color: colors[index],
    }));

    useEffect(() => {
        setData(arrayOfObjects);
    }, []);

    const smallFont = useFont(require("../../assets/fonts/SpaceMono-Regular.ttf"), 25);

    if (!font || !smallFont) {
        return <View/>;
    }

    return (
        <SafeAreaView className="flex-1 bg-background px-4 pt-4">
            {/* Header */}
            <View className="flex-row items-center" style={{marginBottom:70}}>
                <Ionicons name="chevron-back" size={24} />
                <Text className="text-lg font-semibold ml-2">Analytics</Text>
            </View>
            <ScrollView className={'flex-1'} showsVerticalScrollIndicator={false}>


                {/* the buttons*/}

                <View className={'flex-row justify-between  '} style={{marginBottom:40}}>
                    <TouchableOpacity className={'flex-row gap-2 items-center bg-primary p-4 rounded-lg'}>
                        <Text className={'text-white text-base'}>
                            Monthly
                        </Text>
                        <Feather name={'chevron-down'}  color={'white'} size={20}/>
                    </TouchableOpacity>


                    <View className={'flex-row justify-center items-center gap-4'}>
     <View  className={'flex-row items-center gap-2 '}>
         <Credit width={30} height={30} />
         <Text>Income</Text>
     </View>

                        <View  className={'flex-row items-center gap-2 '}>
                            <Debit width={30} height={30} />
                            <Text>Expenses</Text>
                        </View>
                    </View>

                </View>
                {/* the indicator*/}

                <View className={' bg-primary mb-4 rounded-lg self-start'} style={{paddingVertical: 3, paddingHorizontal:15}}>
                    <Text className={'text-white text-sm text-center'}>Jan 23-Jan 30</Text>
                </View>
            <View
                className={
                    "flex-1  rounded-lg border border-gray-200 flex justify-center p-4 "
                }
                style={{ width: "100%"  ,height: 200 }}
            >

                    <CartesianChart
                        data={chartData}
                        xKey="x"
                        yKeys={[ "outflow" ,"inflow"]}
                        domain={{ y: [1000, 8000] }}
                        domainPadding={{ left: 50, right: 50, top: 10 }}
                        axisOptions={{
                            font,
                            tickCount: chartData.length,
                            formatXLabel: (val: any) =>
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


                <View  className={'self-start'} style={{marginVertical:30}}>
                  <Text>Savings Trends</Text>
                </View>


                <View>
                  <View className={'flex-col gap-2'}>
                      <Text className={'text-gray-200 text-2xl'}>Total saved</Text>
                      <Text className={'text-3xl'}>₦ { total }</Text>
                  </View>
                </View>



                {/* pie chart for savings*/}
                <View className={'flex-col items-center'}>
                <View style={styles.chartContainer}>
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
                <View style={styles.legendContainer}>
                    {data.map((item, index) => (
                        <View key={index} style={styles.legendItem}>
                            <View style={[styles.colorCircle, { backgroundColor: item.color }]} />
                            <Text style={styles.legendText}>{item.percentage.toFixed(1)}% - {item.name}</Text>
                        </View>
                    ))}
                </View>
                </View>
            </ScrollView>
        </SafeAreaView>

    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    chartContainer: {
        width: RADIUS * 2,
        height: RADIUS * 2,
        marginTop: 10,
        marginBottom:10
    },
    legendContainer: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: 10,
        marginBottom: 20,

    },
    legendItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    colorCircle: {
        width: 12,
        height: 12,
        borderRadius: 6,
        marginRight: 8,
    },
    legendText: {
        fontSize: 15,
        color: '#333',
    },

});