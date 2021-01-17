import React, { useState, useContext } from 'react';
import { Text, View, StyleSheet, TextInput } from 'react-native';
import { Input } from 'react-native-elements';
import { Button } from 'react-native-elements';
import { FirebaseContext } from '../context/FirebaseContext';
import { UserContext } from '../context/UserContext';
import Icon from 'react-native-vector-icons/FontAwesome';

const SignInScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const firebase = useContext(FirebaseContext);
  const [_, setUser] = useContext(UserContext);

  const signIn = async () => {
    setLoading(true);
    await firebase.signIn(email, password);
    const uid = firebase.getCurrentUser().uid;

    const userInfo = await firebase.getUserInfo(uid);
    setUser({
      isLoggedIn: true,
      email: userInfo.email,
      uid: userInfo.uid,
      username: userInfo.username,
      profilePhotoUrl: userInfo.profilePhotoUrl,
    });

    try {
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>HealthFirst</Text>
      <View style={styles.authContainer}>
        <Input
          containerStyle={styles.inputLabelContainer}
          placeholder='Email'
          onChangeText={(email) => setEmail(email.trim())}
          value={email}
        />
        <Input
          containerStyle={styles.inputLabelContainer}
          placeholder='Password'
          onChangeText={(password) => setPassword(password.trim())}
          value={password}
          secureTextEntry={true}
        />
      </View>
      <Button
        title='Sign In'
        type='solid'
        onPress={signIn}
        containerStyle={{
          width: 150,
        }}
        buttonStyle={{
          backgroundColor: '#881D1D',
        }}
        titleStyle={{
          fontFamily: 'Raleway_400Regular',
        }}
      />
      <View style={styles.signUpContainer}>
        <Text style={{ fontFamily: 'Raleway_400Regular' }}> New User? </Text>
        <Button
          title='Sign Up'
          type='clear'
          onPress={() => navigation.navigate('SignUp')}
          titleStyle={{
            color: '#881D1D',
            fontWeight: 'bold',
            fontFamily: 'Raleway_400Regular',
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 80,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#881D1D',
    marginBottom: 20,
    fontFamily: 'Raleway_800ExtraBold',
  },
  inputLabelContainer: {
    width: 320,
  },
  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  defaultColor: {
    color: '#11B5E4',
  },
});

export default SignInScreen;
