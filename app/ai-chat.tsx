import {
    View,
    Text,
    TextInput,
    ScrollView,
    TouchableOpacity,
    FlatList,
    KeyboardAvoidingView,
    Platform
} from "react-native";
import { useState } from "react";
import {Feather, Ionicons} from "@expo/vector-icons";
import {SafeAreaView} from "react-native-safe-area-context";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import OrionLogo from "@/assets/svgs/orionLogo";
import OrionIcon from "@/assets/svgs/orionIcon";





export default function AiChat() {

const [message , setMessage] = useState("");
    const [messages, setMessages] = useState([
        {id: "1", text: "Hello, how can we assist you today?", sender: "orion"},
        {id: "3", text: "I need help with my statement of account.", sender: "user"},
        {id: "4", text: "Cani know my balance.", sender: "user"},
        {id: "5", text: "I need help with my statement of account.", sender: "user"},
        {id: "6", text: "I need help with my statement of account.", sender: "user"},
        {id: "7", text: "I need help with my statement of account.", sender: "user"},
        {id: "8", text: "I need help with my statement of account.", sender: "user"},
        {id: "9", text: "Hello, how can we assist you today?", sender: "orion"},

        {id: "10", text: "I need help with my statement of account.", sender: "user"},
        {id: "11", text: "I need help with my statement of account.", sender: "user"},
        {id: "12", text: "Hello, how can we assist you today?", sender: "orion"},

        {id: "13", text: "I need help with my statement of account.", sender: "user"},
        {id: "14", text: "I need help with my statement of account.", sender: "user"},
        {id: "15", text: "I need help with my statement of account.", sender: "user"},
        {id: "16", text: "Hello, how can we assist you today?", sender: "orion"},

        {id: "17", text: "I need help with my statement of account.", sender: "user"},
        {id: "18", text: "I need help with my statement of account.", sender: "user"},
        {id: "19", text: "Hello, how can we assist you today?", sender: "orion"},

        {id: "20", text: "I need help with my statement of account.", sender: "user"},
        {id: "21", text: "Hello, how can we assist you today?", sender: "orion"},


    ]);


    const sendMessage = () => {
        if (message.trim() === "") return;

        setMessages([...messages, {id: Date.now().toString(), text: message, sender: "user"}]);
        setMessage("");
    };

    return (
        <SafeAreaView className="flex-1 bg-white px-4 pt-4">
            <View className={'flex-row justify-between items-center'}>
                <View className="flex-row items-center">
                    <Ionicons name="chevron-back" size={24} />
                    <Text className="text-lg font-semibold ml-2">Ai Chat</Text>
                </View>



            </View>


            <FlatList
                showsVerticalScrollIndicator={false}
                data={messages}
                keyExtractor={(item) => item.id}
                renderItem={({item}) => (
                    <View
                        className={`mb-8  my-2 rounded-lg max-w-[80%] flex-row items-start gap-2 justify-start ${
                            item.sender === "user" ? "bg-primary self-end py-3 px-4 " : " self-start"
                        }`}
                    >
                        {
                            item.sender === "orion" && <OrionIcon width={30} height={30}  />
                        }
                        <Text
                            className={`text-${item.sender === "user" ? "white" : "black"}  text-nowrap`}>{item.text}</Text>
                    </View>
                )}
                contentContainerStyle={{padding: 16}}
            />

            {/* Input Field */}
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                className="  flex-row items-center"
            >
<View className={'  px-4 relative flex-row shadow  flex-1 items-center py-2 justify-between'}>
                <TextInput
                    value={message}
                    multiline={true}
                    maxLength={1000}
                    spellCheck={true}
                    onChangeText={setMessage}
                    placeholder="Message the Orion ai..."
                    className="  rounded-lg px-2 text-lg  border border-gray-300 py-4 focus:outline-primary flex-1"
                />
<View className={'flex-row items-center gap-2  h-full  flex-3  self-center'} >
    <MaterialIcons name="attach-file" size={30} color="gray" />

    <Feather name="send" size={24} color="black" onPress={sendMessage} />
</View>
</View>
            </KeyboardAvoidingView>




        </SafeAreaView>
    );
}
