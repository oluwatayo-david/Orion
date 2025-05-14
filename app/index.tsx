import {View} from "react-native";
import {Redirect} from "expo-router";
import {useEffect, useState} from "react";
import "react-native-reanimated";
import "react-native-gesture-handler";
import OrionLogo from "@/assets/svgs/orionLogo";

export default function Index() {

    const user = false
    const [redirectPath, setRedirectPath] = useState("");

    useEffect(() => {
        const checkAuth = () => {


            if (!user) {
                setRedirectPath("/(auth)");
            } else {
                setRedirectPath("/(tabs)");
            }
        };

        const timer = setTimeout(checkAuth, 3000);

        return () => clearTimeout(timer);
    }, []);

    if (redirectPath) {
        return <Redirect href={redirectPath}/>;
    }

    return (
        <View className="w-full h-full px-4 items-center justify-center">
            <OrionLogo width={100} height={100}/>
        </View>
    );
}
