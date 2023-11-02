import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import {StatusBar} from 'react-native';
import {setupI18Next} from '@/lib/i18n/setup';
import Navigation from '@/navigation/index';
import globalStyles from '@/styles/global';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {ThemeProvider} from '@shopify/restyle';
import {theme} from '@/theme/theme';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';

export default function App() {
  const [i18nInitialized, setI18nInitialized] = useState(false);

  useEffect(() => {
    if (!i18nInitialized) {
      setupI18Next(() => setI18nInitialized(true));
    }
  }, [i18nInitialized]);

  return (
    <GestureHandlerRootView style={globalStyles.f1}>
      <ThemeProvider theme={theme}>
        <BottomSheetModalProvider>
          <StatusBar barStyle="dark-content" />
          <Navigation i18nInitialized={i18nInitialized} />
        </BottomSheetModalProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
