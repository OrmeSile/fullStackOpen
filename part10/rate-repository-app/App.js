import Main from './src/components/Main';
import { StatusBar } from 'expo-status-bar';
import { NativeRouter } from 'react-router-native';

const App = () => {
  return (
    <>
      <NativeRouter>
        <Main />
        <StatusBar style='auto' />
      </NativeRouter>
    </>
  );
};

export default App;
