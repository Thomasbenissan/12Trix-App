import { useCallback } from 'react';
import { MainNavigator } from './src/navigation/mainNavigator';

import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

import { UsernameProvider } from './src/components/userContext';

export default function App() {
  const [fontsLoaded] = useFonts({
    'Rubik-Light': require('./assets/fonts/Rubik-Light.ttf'),
    'Rubik-Regular': require('./assets/fonts/Rubik-Regular.ttf'),
    'Rubik-Medium': require('./assets/fonts/Rubik-Medium.ttf'),
    'Rubik-SemiBold': require('./assets/fonts/Rubik-SemiBold.ttf'),
    'Rubik-Bold': require('./assets/fonts/Rubik-Bold.ttf'),
    'Rubik-ExtraBold': require('./assets/fonts/Rubik-ExtraBold.ttf'),
    'Rubik-Black': require('./assets/fonts/Rubik-Black.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <UsernameProvider>
      <MainNavigator />
    </UsernameProvider>
  );

}