import React, { useContext, useState } from 'react';
import { Platform } from 'react-native';
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { AntDesign } from '@expo/vector-icons';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import { FirebaseContext } from '../context/FirebaseContext';
import { UserContext } from '../context/UserContext';

const SignUpScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [profilePhoto, setProfilePhoto] = useState();
  const [gender, setGender] = useState('Select');
  const [age, setAge] = useState('');
  const firebase = useContext(FirebaseContext);
  const [_, setUser] = useContext(UserContext);

  const getPermission = async () => {
    if (Platform.OS !== 'web') {
      const { status } = await Permissions.askAsync(Permissions.CAMERA);
      return status;
    }
  };

  const pickImage = async () => {
    try {
      let imageResult = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.5,
      });

      if (!imageResult.cancelled) {
        setProfilePhoto(imageResult.uri);
      }
    } catch (error) {
      console.log('Error picking an image! ', error);
    }
  };

  const addProfilePhoto = async () => {
    const status = await getPermission();
    if (status !== 'granted') {
      alert('We need permission to access your camera roll');
      return;
    }

    pickImage();
  };

  const signUp = async () => {
    setLoading(true);
    const user = { username, email, password, profilePhoto };

    try {
      const createdUser = await firebase.createUser(user);
      setUser({ ...createdUser, isLoggedIn: true });
    } catch (error) {
      console.log('Error signing up user! ', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
  
      <Text style={styles.title}>Sign Up</Text>
      <TouchableOpacity onPress={addProfilePhoto}>
        <View style={styles.profilePhotoContainer}>
          {profilePhoto ? (
            <Image
              source={{ uri: profilePhoto }}
              style={styles.profilePhoto}
            ></Image>
          ) : (
            <View style={styles.profilePhotoPlaceholder}>
              <AntDesign name='plus' size={24} color='#ffffff' />
            </View>
          )}
        </View>
      </TouchableOpacity>
      <View style={styles.authContainer}>
        <Input
          containerStyle={styles.inputLabelContainer}
          placeholder='Username'
          onChangeText={(username) => setUsername(username.trim())}
          value={username}
        />
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
        />
      </View>
      {/*<Picker
        selectedValue={gender}
        style={{ height: 50, width: 100 }}
        onValueChange={(itemValue) => setGender(itemValue)}
      >
        <Picker.Item label='Select' value='Select' />
        <Picker.Item label='Male' value='Male' />
        <Picker.Item label='Female' value='Female' />
      </Picker>*/}
      <Button
        title='Sign Up'
        type='solid'
        onPress={signUp}
        containerStyle={{
          width: 150,
        }}
        buttonStyle={{
          backgroundColor: '#881D1D',
        }}
        titleText={{
          fontFamily: 'Raleway_400Regular',
        }}
      />
      <View style={styles.signUpContainer}>
        <Text style={{ fontFamily: 'Raleway_400Regular' }}>
          Have An Account?
        </Text>
        <Button
          titleStyle={{
            color: '#881D1D',
            fontWeight: 'bold',
            fontFamily: 'Raleway_400Regular',
          }}
          title='Sign In'
          type='clear'
          onPress={() => navigation.navigate('SignIn')}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 80,
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    color: '#881D1D',
    marginBottom: 20,
    fontFamily: 'Raleway_800ExtraBold',
  },
  profilePhotoContainer: {
    width: 88,
    height: 88,
    backgroundColor: '#CAB7A1',
    borderRadius: 50,
    alignSelf: 'center',
    overflow: 'hidden',
    marginTop: 16,
  },
  profilePhoto: {
    flex: 1,
  },
  profilePhotoPlaceholder: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 32,
  },
  inputLabelContainer: {
    width: 320,
  },
  authContainer: {
    marginTop: 10,
    marginBottom: 20,
  },
  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  tinyLogo: {
    width: 200,
    height: 200,
  }
});

export default SignUpScreen;
