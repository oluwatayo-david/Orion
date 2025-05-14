import React, {useState , useRef, useEffect } from "react";
import {
    Keyboard,
    KeyboardAvoidingView,
    ScrollView,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
    Dimensions, Animated, FlatList, StyleSheet

} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {useForm} from "react-hook-form";
import {generalSans} from "@/constants/Font";
import {CustomInput} from "@/components/Input";
import {useRouter} from "expo-router";
import {Feather, Ionicons} from "@expo/vector-icons";
import OrionIcon from "@/assets/svgs/orionIcon";
import {useLocalSearchParams} from "expo-router";
import BottomSheet from "@ahmetaltai/react-native-bottom-sheet/src";
import PopModal from "@/components/Modal";

import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell,
} from 'react-native-confirmation-code-field';

export default function SelectAmountScreen() {
 const [selected  , setSelected] = useState('');
    const {control, handleSubmit , watch , reset , setValue:set} = useForm({
        defaultValues: {
            amount: ''
        },
    });
    const {Bold, SemiBold} = generalSans
 const valueRef = useRef(null);
    const router = useRouter();
  const {accountName , accountNumber } = useLocalSearchParams()
 const [continuePayment  , setContinuePayment ] = useState(false )
    const onSubmit = async (data:any) => {
        try {



            console.log(data )

        } catch (e) {

        }
    };

  const handlePasteAmount = (value:any)=>{
      if(!value) return
      set("amount", value);
      setSelected(value)

  }



 const prices = ['100.00' , '500.00' ,'1000.00', '2000.00']

    const BottomSheetRef = useRef<BottomSheetRef>();

    const BottomSheetPinRef = useRef<BottomSheetRef>();


    const OpenBottomSheet = () => {
        BottomSheetRef.current?.open();
        console.log('hello')
    };

    const CloseBottomSheet = () => {
        BottomSheetRef.current?.close();
    }

    const OpenPinBottomSheet = () => {
        BottomSheetPinRef.current?.open();
        console.log('hello')
    };

    const ClosePinBottomSheet = () => {
        BottomSheetPinRef.current?.close();
    }




    const CELL_COUNT = 4;
    const CORRECT_PIN = '1234';

    const [value, setValue] = useState('');
    const [error, setError] = useState('');
    const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue,
    });




    // Validate PIN when 4 digits are entered
    useEffect(() => {
        if (value.length === CELL_COUNT) {
            // Check if PIN is correct
            if (value === CORRECT_PIN) {
                ClosePinBottomSheet()
                setError('');
                // Add a slight delay to show the completed PIN before proceeding

            } else {
                setError('Incorrect PIN. Please try again.');
                setValue(''); // Clear the input for retry
            }
        } else {
            setError('');
        }
    }, [value]);

    // Custom keyboard handlers
    const handleKeyPress = (key: string) => {
        if (value.length < CELL_COUNT) {
            setValue(prevValue => prevValue + key);
        }
    };

    const handleDelete = () => {
        setValue(prevValue => prevValue.slice(0, -1));
    };

    // Render each numbered key
    const renderKey = (num: string) => (
        <TouchableOpacity
            className="flex-1 items-center justify-center bg-[#414141] rounded-lg "
            onPress={() => handleKeyPress(num)}
            style={{width:70 , height:70 , backgroundColor:'#414141'}}
        >
            <Text className="text-white text-3xl font-medium">{num}</Text>
        </TouchableOpacity>
    );

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

                                <View className={'border border-gray-200 rounded-lg  flex-row  justify-center gap-2 bg-white mt-4'} style={{paddingVertical:20, paddingHorizontal:30}}>
                                    <View className={'self-center'}>
                                        <OrionIcon width={50} height={50}/>
                                    </View>

                                    <View className={'flex-col gap-2 justify-start '}>
                                        <Text className={'text-2xl text-bold'}>{accountName}</Text>

                                        <Text className={'text-lg font-bold'}> Account Number{'  '}|{'  '}<Text className={' text-gray-400'}> {accountNumber}</Text></Text>
                                    </View>
                                </View>

                            </View>


                            <View className={'mt-8  relative'}>

                                <CustomInput
                                    label="Amount"
                                    name="amount"
                                    control={control}
                                    placeholder="100.00 - 9,000.00"
                                    keyboardType={'numeric'}
                                    rules={{required: "This field is required"}}
                                    style={{fontFamily: generalSans.Light}}
                                    onChange={()=> {

                                    }}

                                />




                            </View>


<View className={'flex-row gap-2 items-center justify-between'}>
    {
        prices.map((price, index)=>(
            <TouchableOpacity ref={valueRef} onPress={()=> handlePasteAmount(price)}  key={index} className={`${selected === price  ? 'bg-primary ' : ''} p-4 border border-gray-300 rounded-lg`}>
                <Text className={`${selected === price  ? 'text-white ' : ''}`}>{price}</Text>
            </TouchableOpacity>
        ))
    }

</View>



                            <View>
                                <CustomInput
                                    label="Remark"
                                    name="remark"
multiline
                                    size={100}
                                    control={control}
                                    numberOfLines={5}
                                    placeholder="Transaction descriptioni"
                                    rules={{required: "This field is required"}}
                                    style={{fontFamily: generalSans.Light}}
                                    onChange={()=> {

                                    }}

                                />
                            </View>



<TouchableOpacity className={'bg-primary py-4 rounded-lg mt-8 '} onPress={OpenBottomSheet}>
    <Text className={'text-center text-white text-lg'}>
        Continue Payment
    </Text>
</TouchableOpacity>



                        </View>


                    </ScrollView>
                </SafeAreaView>
                <BottomSheet
                    index={1}
                    ref={BottomSheetRef}
                    points={['50%', '80%']}

                    style={{
                        borderTopLeftRadius: '50%',
                        borderTopRightRadius: '50%',
                        overflow: "hidden",
                       backdrop:{
                            background:'#2B2828'
                       }
                    }}

                >

                   <View className={'flex-1 w-full bg-[#272727] p-4'}>
<View className={'flex-row items-center justify-start'}>
    <Feather name={'x'} size={24} color={'white'} onPress={()=>setContinuePayment(true)}/>
</View>

                       <View className={'py-2 mb-4'}>
                           <Text className={'text-white text-center'} style={{fontSize:40}}>{selected}</Text>
                       </View>

                       <View className={'flex-col gap-2 justify-between  '} >

                           {/*account number*/}
                           <View className={'flex-row items-center justify-between'}>
                               <Text className={'text-white text-lg '}>Account Number</Text>
                               <View className={'flex-row items-center gap-4'}>
                                   <View className={'self-end  rounded-full bg-gray-300'} style={{paddingVertical:20 , paddingHorizontal:25}}>
                                       <Text>{accountName.slice(0,2)}</Text>
                                   </View>
                                   <Text className={'text-white text-lg'}>{accountNumber}</Text></View>


                           </View>

                           {/*account name*/}
                           <View className={'flex-row items-center  gap-2 justify-between mb-4'}>
                               <Text className={'text-white text-lg'}>Account Name</Text>

                                   <Text className={'text-white text-lg'}>{accountName}</Text></View>



                       </View>


                       {/*Amount*/}

                       <View className={'flex-row items-center  gap-2 justify-between '}>
                           <Text className={'text-white text-lg'}>Amount</Text>

                           <Text className={'text-white text-lg'}>{selected}</Text>



                   </View>

                       {/*current balance */}

                       <View className={'border border-[#414141] rounded-lg mt-8 p-4 flex-col gap-2 '}>
                            <Text className={'text-2xl text-white'}>Current Balance{' '}(50,000.00)</Text>
                          <View className={'flex-row  items-center  justify-between'}>
                              <Text className={'text-[#414141]'}>Sufficient Balance</Text>
                              <TouchableOpacity className={'flex-row items-center gap-2 '}>
                                  <Text className={'text-white text-lg'}>Add Money </Text>
                                  <Feather name={'chevron-right'} size={20} color={'white'}/>
                              </TouchableOpacity>

                          </View>

                       </View>

                       {/*payment method*/}
                       <View className={'mt-8'}>
                           <Text className={'text-white text-start text-2xl'}>
                               Payment Method
                           </Text>

                          <View className={'flex-row items-center justify-start mt-4 gap-4'}>
                  <TouchableOpacity className={'flex justify-center items-center p-4 rounded-lg  border border-gray-300 '}>
                      <Feather name={'plus'}  size={30} color={'white'}/>
                  </TouchableOpacity>
                              <Text className={'text-2xl text-white'}>Add a Bank Card</Text>
                          </View>
                       </View>

                       {/*submit button*/}
                       <TouchableOpacity className={'bg-primary py-4 rounded-lg mt-8 '} onPress={()=>{
                           OpenPinBottomSheet()
                       }}>
                           <Text className={'text-lg text-center text-white '}>
                               Continue Payment
                           </Text>
                       </TouchableOpacity>
                   </View>
                </BottomSheet>


                <PopModal visible={continuePayment} onRequestClose={() => setContinuePayment(false)}>
<View className={'bg-[#272727] rounded-lg  flex-col gap-4 items-center justify-center p-8'} style={{height:'30%' , width:'90%'}}>
<Feather name={'info'}  size={30} color={'white'}/>
    <Text className={' text-white text-center text-2xl'}>Are you sure you want
        to cancel payment?</Text>

    <View className={'flex-row items-center gap-4'}>
        <TouchableOpacity className={'px-4 py-4 rounded-lg  flex-1 border border-[#414141]'} onPress={()=> {
            setContinuePayment(false)
            ClosePinBottomSheet()
        }}>
            <Text className={'text-lg text-center text-white '}>
                Cancel
            </Text>
        </TouchableOpacity>



        <TouchableOpacity className={'bg-primary py-4 rounded-lg px-4 flex-1 '} onPress={()=>setContinuePayment(true)}>
            <Text className={'text-lg text-center text-white '}>
                Continue
            </Text>
        </TouchableOpacity>
    </View>
</View>
                </PopModal>








                <BottomSheet
                    index={1}
                    ref={BottomSheetPinRef}
                    points={['50%', '70%']}

                    style={{
                        borderTopLeftRadius: '50%',
                        borderTopRightRadius: '50%',
                        overflow: "hidden",

                    }}

                >

                    <View className={'flex-1 w-full bg-[#272727] p-4'}>


                            <View className={'flex-row items-center justify-end mb-8'}>
                                <Feather name={'x'} size={30} color={'white'} onPress={()=>setContinuePayment(true)}/>
                            </View>

                        <View className={'py-2 mb-4'}>
                            <Text className={'text-white text-center'} style={{fontSize:25}}>Transaction Pin</Text>
                        </View>

                        <CodeField
                            ref={ref}
                            {...props}
                            caretHidden={false}
                            value={value}
                            onChangeText={setValue}
                            cellCount={CELL_COUNT}
                            rootStyle={[styles.codeFieldRoot]}
                            textContentType="oneTimeCode"
                              secureTextEntry
                            readOnly
                            renderCell={({index, symbol, isFocused}) => (
                                <Text
                                    key={index}
                                    style={[styles.cell, isFocused && styles.focusCell, error && styles.cellError]}
                                    onLayout={getCellOnLayoutHandler(index)}>
                                    {symbol || (isFocused ? <Cursor/> : null)}
                                </Text>
                            )}

                        />

                        <Text className={'text-center py-4 '} style={{color: '#FF0000'}}>{error}</Text>


                        {/* Row 2: 4-5-6 */}
                        <View className="flex-row h-16 gap-2 " style={{marginBottom:20}}>
                            {renderKey('1')}
                            {renderKey('2')}
                            {renderKey('3')}
                        </View>

                        {/* Row 2: 4-5-6 */}
                        <View className="flex-row h-16  gap-2 " style={{marginBottom:20}}>
                            {renderKey('4')}
                            {renderKey('5')}
                            {renderKey('6')}
                        </View>

                        {/* Row 3: 7-8-9 */}
                        <View className="flex-row h-16  space-x-2 gap-2 " style={{marginBottom:20}}>
                            {renderKey('7')}
                            {renderKey('8')}
                            {renderKey('9')}
                        </View>

                        {/* Row 4: 0 and Delete */}
                        <View className="flex-row h-16 space-x-2  gap-2 ">
                            <View className={'flex-1 w-full bg-[#414141] rounded-lg items-center justify-center '}  style={{ height:70  , backgroundColor:'#414141'}}
                            > {renderKey('0')}</View>

                            <TouchableOpacity
                                className=" items-center justify-center bg-[#414141] rounded-md "
                                onPress={handleDelete}
                                style={{width:114 , height:70 , backgroundColor:'#414141'}}
                            >
                                <Feather name="delete" size={24} color="white" />
                            </TouchableOpacity>
                        </View>
                    </View>





                </BottomSheet>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({

    codeFieldRoot: {marginTop: 2, paddingHorizontal: '3%'},
    cell: {
        width: 70,
        height: 70,
        lineHeight: 60,
        fontSize: 24,
        borderWidth: 1,
        borderColor: '#008080',
        textAlign: 'center',
        borderRadius: 10,
        backgroundColor:'white'

    },
    cellError: {
        borderColor: '#FF0000',

    },
    focusCell: {
        borderColor: 'red',
    },

});

