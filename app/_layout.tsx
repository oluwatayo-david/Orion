import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import {View}from 'react-native'
import { Stack  , Slot} from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { useColorScheme } from '@/hooks/useColorScheme';
import '../global.css'
// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    "GeneralSans-Bold": require("../../ORION/assets/fonts/GeneralSans-Bold.otf"),
    "GeneralSans-BoldItalic": require("../../ORION/assets/fonts/GeneralSans-BoldItalic.otf"),
    "GeneralSans-Italic": require("../../ORION/assets/fonts/GeneralSans-Italic.otf"),
    "GeneralSans-ExtralightItalic": require("../../ORION/assets/fonts/GeneralSans-ExtralightItalic.otf"),
    "GeneralSans-Extralight": require("../../ORION/assets/fonts/GeneralSans-Extralight.otf"),
    "GeneralSans-Regular": require("../../ORION/assets/fonts/GeneralSans-Regular.otf"),
    "GeneralSans-Light": require("../../ORION/assets/fonts/GeneralSans-Light.otf"),
    "GeneralSans-LightItalic": require("../../ORION/assets/fonts/GeneralSans-LightItalic.otf"),
    "GeneralSans-Semibold": require("../../ORION/assets/fonts/GeneralSans-Semibold.otf"),
    "GeneralSans-Medium": require("../../ORION/assets/fonts/GeneralSans-Medium.otf"),
    "GeneralSans-MediumItalic": require("../../ORION/assets/fonts/GeneralSans-MediumItalic.otf"),
    "GeneralSans-SemiboldItalic": require("../../ORION/assets/fonts/GeneralSans-SemiboldItalic.otf"),
  });




  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <View className={'flex-1 '}>
      <Slot/>
      <StatusBar style="auto" />
    </View>
  );
}
