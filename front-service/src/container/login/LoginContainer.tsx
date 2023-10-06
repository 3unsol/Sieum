import Login from '~presentation/login/Login';
import {useState} from 'react';

const LoginContainer = ({navigation}: any) => {
  const [test, setTest] = useState();
  const onPress = () => {
    navigation.navigate('LoginWebView');
  };
  return <Login onPress={onPress} test={test} />;
};

export default LoginContainer;
