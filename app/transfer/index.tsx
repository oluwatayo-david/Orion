import React, {useState , useRef} from "react";
import {
    Keyboard,
    KeyboardAvoidingView,
    ScrollView,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
    Dimensions, Animated, FlatList

} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {useForm} from "react-hook-form";
import {generalSans} from "@/constants/Font";
import {CustomInput} from "@/components/Input";
import {useRouter} from "expo-router";
import {Feather, Ionicons} from "@expo/vector-icons";
import OrionIcon from "@/assets/svgs/orionIcon";
import items from "ajv/lib/vocabularies/applicator/items";
import Empty from "@/assets/svgs/Empty";

export default function TransferScreen() {
 const [isTyping , setIsTyping ] = useState(false);
    const {control, handleSubmit , watch , reset} = useForm({
        defaultValues: {
        account_number: ''
        },
    });
    const {Bold, SemiBold} = generalSans

    const router = useRouter();


    const onSubmit = async (data:any) => {
        try {



            console.log(data )

        } catch (e) {

        }
    };

    const handleTyping = ()=>{
      const  value = watch ('account_number')
        if ( !value ) {
            reset({account_number: ''})
            setIsTyping(false)
        }
        else{
            setIsTyping(true)
        }

    }


    const handleOnSelectAccount = () => {
        let value = watch('account_number')?.replace(/\s+/g, '').trim();

        if (!value) {
          reset({account_number: ''})
            setIsVisible(false);
            setMatchingAccounts([]);
            return;
        }

        const matched = accounts.filter(account =>
            account.accountNumber.replace(/\s+/g, '').startsWith(value)
        );

        if (matched.length === 0) {
            setIsVisible(false);
            setMatchingAccounts([]);
        } else {
            setIsVisible(true);
            setMatchingAccounts(matched);
        }
    };


    {/*logic for animation*/}

    const { width, height } = Dimensions.get("window"); // Get screen width

    const [activeTab, setActiveTab] = useState("Summary");
    const [expandedIndex, setExpandedIndex] = useState(null);
    const translateX = useRef(new Animated.Value(0)).current; // Initial translateX
    // const colorMode = useColorScheme();
    // const barColors = colorMode === "dark" ? ["#FF6384", "#36A2EB"] : ["red", "blue"];
const [isVisible, setIsVisible] = useState(false);
const [matchingAccounts , setMatchingAccounts] = useState([]);
    const toggleTab = (tab:any) => {
        setActiveTab(tab);

        // Transition to the appropriate tab
        Animated.timing(translateX, {
            toValue: tab === "Recents" ? 0 : -width,
            duration: 300,
            useNativeDriver: true,
        }).start();
    };



    const  accounts = [
        { id:1 , name: 'Emmanuel Chukuemeka' , accountNumber: '22 5677 2245'},
        { id:2 , name: 'Emmanuel Esther' , accountNumber: '45 0000 1224'},
        { id:3 , name: 'Job Caleb' , accountNumber: '90 2222 0909'},
        { id:4 , name: 'David Oluwatayo ' , accountNumber: '21 0090 1122'},
        { id:5  , name: 'Glory Mary ' , accountNumber: '74 7284 9022'},
        { id:6 , name: 'Fred Adogo  ' , accountNumber: '70 0947 6161'},

    ]


    const handleClearInput = () => {
        reset({ account_number: '' });
        setIsTyping(false);
        setIsVisible(false);
        setMatchingAccounts([]);
    }



    const highlightMatch = (text, query) => {
        if (!query) return <Text className="text-md">{text}</Text>;

        // Remove spaces for comparison since your filter does that too
        const cleanQuery = query.replace(/\s+/g, '').trim();
        const cleanText = text.replace(/\s+/g, '');

        // If the account number starts with the query
        if (cleanText.startsWith(cleanQuery)) {
            const matchLength = cleanQuery.length;

            // Format the original text with spaces for display
            const matchPart = text.substring(0, matchLength);
            const restPart = text.substring(matchLength);

            return (
                <Text className="text-md">
                    <Text style={{ color: '#008080' }}>{matchPart}</Text>
                    <Text>{restPart}</Text>
                </Text>
            );
        }

        return <Text className="text-md">{text}</Text>;
    };




    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <KeyboardAvoidingView style={{flex: 1}} behavior="padding">
                <SafeAreaView className="flex-1 bg-background pt-4">
                    {/* Header */}


                    <View className="flex-row items-center  ">
                        <Ionicons name="chevron-back" size={24} />
                        <Text className="text-lg font-semibold ml-2">Transfer To Orion Account</Text>
                    </View>
                    <ScrollView keyboardShouldPersistTaps="handled">
                        <View className="p-4 pt-3 flex flex-col gap-4" style={{paddingTop: 40}}>

<View className={''}>
    <View className={'mb-4 '}>
        <Text className={' text-lg font-bold'}>Transfer from</Text>

    </View>
    <View className={'border border-gray-200 rounded-lg  flex-row  justify-center gap-2 bg-white'} style={{paddingVertical:20, paddingHorizontal:30}}>
        <View className={'self-center'}>
            <OrionIcon width={50} height={50}/>
        </View>

        <View className={'flex-col gap-2 justify-start '}>
          <Text className={'text-2xl text-bold'}>John Doe Emmanuel</Text>

                <Text className={'text-lg text-bold text-gray-400'}> Account Number{'  '}|{'  '} 224 567 1234</Text>
            <Text className={'text-lg text-bold text-gray-400'}> Account Balance{'  '}|{'  '} 50,000.00</Text>



        </View>
    </View>

</View>


<View className={'mt-8  relative'}>

                            <CustomInput
                                label="Account Number"
                                name="account_number"
                                control={control}
                                placeholder="Enter Account Number"
                                keyboardType={'numeric'}
                                maxLength={10}
                                rules={{required: "This field is required"}}
                                style={{fontFamily: generalSans.Light}}
                                onChange={()=> {
                                    handleTyping()
                                    handleOnSelectAccount()
                                }}
                               icon={
                                isTyping? (
                                    <TouchableOpacity onPress={handleClearInput}>
                                        <Feather name={'x-square'} color={'#008080'} size={20} />
                                    </TouchableOpacity>
                                ):(
                                    <TouchableOpacity className={'flex-row gap-2 items-center'}>
                                       <Text className={'text-primary text-md'}>Paste</Text>
                                        <Feather name={'copy'}  color={'#008080'} size={20}/>
                                    </TouchableOpacity>
                                )
                               }

                            />

    {
        isVisible &&  matchingAccounts.length > 0 && (
            <ScrollView   className={`border border-gray-300 rounded-lg absolute   bg-background left-0 right-0  ${!isVisible? 'hidden': ''} `} style={{minHeight:isVisible?matchingAccounts.length * 100:0 , top:80 , zIndex:isVisible?1000:0 }}>

                {
                    matchingAccounts.map(account=>{
                        return (
                            <TouchableOpacity key={account?.id} className="flex-row gap-2 items-center justify-start border-b border-b-gray-200" style={{ padding: 10 }}  onPress={() => {
                               router.push({
                                   pathname:'/transfer/select-amount',
                                   params:{
                                       accountName : account?.name,
                                       accountNumber:account?.accountNumber
                                   }
                               })
                            }}>
                                <View className="rounded-full bg-gray-200" style={{ paddingHorizontal: 25, paddingVertical: 25 }}>
                                    <Text>{account?.name.slice(0, 2)}</Text>
                                </View>
                                <View className="flex-col gap-2 ">
                                    <Text className={'text-lg font-bold'}>{account?.name}</Text>
                                    {highlightMatch(account?.accountNumber, watch('account_number'))}
                                </View>
                            </TouchableOpacity>
                        )
                    })
                }




            </ScrollView>
        )
    }
             </View>





                            {/*recent and favourite*/}


                            {/*tab*/}
                            <View  className={'flex-1 border border-gray-300 rounded-lg '}>
                            <View className="flex-row justify-between mt-4 border-b border-gray-300 mb-4 py-4 " style={{paddingHorizontal:40}}>
                                <TouchableOpacity onPress={() => toggleTab("Recents")}>
                                    <Text className={`text-lg font-semibold ${activeTab === "Recents" ? "text-teal-600" : "text-gray-500"}`}>
                                       Recents
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => toggleTab("Favourites")}>
                                    <Text className={`text-lg font-semibold ${activeTab === "Favourites" ? "text-teal-600" : "text-gray-500"}`}>
                                       Favourites
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            {/*content*/}
                            <View style={{ flex: 1, overflow: "scroll" }}>
                                <Animated.View
                                    style={{
                                        flexDirection: "row",
                                        width: width * 2,
                                        transform: [{ translateX }],
                                    }}
                                >
                                    {/* recent Screen */}
                                    <View style={{ width, height:313 }} className={'relative'}>

                                        <FlatList
                                            data={accounts}
                                            keyExtractor={(item) => item.id.toString()}
                                            renderItem={({ item }) => (
                                                <TouchableOpacity className="flex-row gap-2 items-center justify-start border-b border-b-gray-200" style={{ padding: 10 }}>
                                                    <View className="rounded-full bg-gray-200" style={{ paddingHorizontal: 25, paddingVertical: 25 }}>
                                                        <Text>{item?.name.slice(0, 2)}</Text>
                                                    </View>
                                                    <View className="flex-col gap-2 ">
                                                        <Text className={'text-lg font-bold'}>{item?.name}</Text>
                                                        <Text className={'text-md '}>{item?.accountNumber}</Text>
                                                    </View>
                                                </TouchableOpacity>
                                            )}
                                            scrollEnabled={!isVisible}
                                        />



                                    </View>

                                    {/* favourite Screen */}
                                    <View style={{ width, height:313 }}>
                                        <ScrollView
                                            showsVerticalScrollIndicator={false}
                                            contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 16  , justifyContent:'center' , alignItems:'center' }}
                                            className={'px-4'}
                                        >
                                            <View className={'flex-col gap-8 items-center'}>
                                           <Empty width={200} height={200}/>
                                                <Text className={'text-gray-400 text-center text-lg'}>No Favorite yet, you can add your favorite
                                                    transactions. </Text>
                                            </View>
                    </ScrollView>
                </View>
            </Animated.View>
        </View>
                            </View>



                        </View>


                    </ScrollView>
                </SafeAreaView>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    );
}
