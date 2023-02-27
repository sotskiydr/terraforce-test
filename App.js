import { NavigationContainer } from '@react-navigation/native';
import TabNavigation from './src/navigation/TabNavigation';
import { QueryClient, QueryClientProvider } from 'react-query';
import Toast from 'react-native-toast-message';
import { toastConfig } from './src/helpers/ToastNotify';

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <TabNavigation />
      </NavigationContainer>
      <Toast config={toastConfig} />
    </QueryClientProvider>
  );
}
