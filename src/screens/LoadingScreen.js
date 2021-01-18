import React, { useEffect, useContext } from 'react';
/*import { View, Text, StyleSheet } from 'react-native';*/
import { View, Image, StyleSheet } from 'react-native';
import { UserContext } from '../context/UserContext';
import { FirebaseContext } from '../context/FirebaseContext';


const LoadingScreen = () => {
  const [_, setUser] = useContext(UserContext);
  const firebase = useContext(FirebaseContext);

  useEffect(() => {
    setTimeout(async () => {
      const user = firebase.getCurrentUser();

      if (user) {
        const userInfo = await firebase.getUserInfo(user.uid);

        setUser({
          isLoggedIn: true,
          email: userInfo.email,
          uid: userInfo.uid,
          username: userInfo.username,
          profilePhotoUrl: userInfo.profilePhotoUrl,
        });
      } else {
        setUser((state) => ({ ...state, isLoggedIn: false }));
      }
    }, 1000);
  }, []);



    return (
      <View style={styles.container}>
        <Image
          style={styles.tinyLogo}
          source={require('/Users/jolieipyingsee/Desktop/github/HealthFirst/assets/HealthFirst.png')}
        />
        </View>
      );
    };
/*  return (
    <View style={styles.container}>
      <Text style={styles.loadingText}>  </Text>
    </View>
  );
};

*/



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 35,
    fontWeight: '800',
    color: '#11B5E4',
  },
});

export default LoadingScreen;
