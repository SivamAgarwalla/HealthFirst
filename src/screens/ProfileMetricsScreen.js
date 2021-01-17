import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { db, FirebaseContext } from '../context/FirebaseContext';
import { UserContext } from '../context/UserContext';
import { Button } from 'react-native-elements';
import { set } from 'react-native-reanimated';
import { AntDesign } from '@expo/vector-icons';

const HomeRecordingScreen = () => {
  const [user, setUser] = useContext(UserContext);
  const firebase = useContext(FirebaseContext);
  const currentUser = firebase.getCurrentUser();
  const [userData, setUserData] = useState({});
  const [recordings, setRecordings] = useState(null);
  const [formAverageData, setFormAverageData] = useState({});

  const logOut = async () => {
    const loggedOut = await firebase.logOut();

    if (loggedOut) {
      setUser((state) => ({ ...state, isLoggedIn: false }));
    }
  };

  useEffect(() => {
    const getUserInfo = async () => {
      const userData = await firebase.getUserInfo(currentUser.uid);
      setUserData(userData);
    };
    getUserInfo();
  }, []);

  useEffect(() => {
    let numberOfRecordings = 0;
    let averagePainRating = 0;
    let averageSicknessRating = 0;
    db.collection('users')
      .doc(currentUser.uid)
      .collection('recordings')
      .orderBy('timestamp', 'desc')
      .onSnapshot((snapshot) => {
        const recordingData = [];
        snapshot.docs.forEach((recordingDoc) => {
          const recordingObject = {
            id: recordingDoc.id,
            data: recordingDoc.data(),
          };
          recordingData.push(recordingObject);
          averagePainRating += recordingDoc.data().recordingFormInput
            .painRating;
          averageSicknessRating += recordingDoc.data().recordingFormInput
            .sicknessRating;
          numberOfRecordings++;
        });
        setRecordings(recordingData);
        averagePainRating = averagePainRating / numberOfRecordings;
        averageSicknessRating = averageSicknessRating / numberOfRecordings;
        setFormAverageData({
          painRating: Number(averagePainRating.toFixed(2)),
          sicknessRating: Number(averageSicknessRating.toFixed(2)),
        });
      });
  }, []);

  return (
    <View style={styles.container}>
      {recordings && console.log(recordings.length)}
      {console.log(formAverageData)}
      <Button title='Log Out' type='solid' onPress={logOut} />
      <View style={styles.headerSection}>
        <View style={styles.profilePhotoContainer}>
          {userData.profilePhotoUrl !== 'default' ? (
            <Image
              source={{ uri: userData.profilePhotoUrl }}
              style={styles.profilePhoto}
            ></Image>
          ) : (
            <View style={styles.profilePhotoPlaceholder}>
              <AntDesign name='plus' size={24} color='#ffffff' />
            </View>
          )}
        </View>
        <View>
          <Text
            style={styles.headerTitle}
          >{` Hello ${userData.username}`}</Text>
          <Text
            style={styles.headingAnalytics}
          >{` Pain Rating ${formAverageData.painRating}`}</Text>
          <Text
            style={styles.headingAnalytics}
          >{` Sickness Rating ${formAverageData.sicknessRating}`}</Text>
        </View>
      </View>
      <View style={styles.sharingSection}></View>
      <View style={styles.analyticsSection}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 40,
  },
  profilePhotoContainer: {
    width: 100,
    height: 100,
    backgroundColor: '#11B5E4',
    borderRadius: 50,
    alignSelf: 'center',
    overflow: 'hidden',
  },
  profilePhoto: {
    flex: 1,
  },
  profilePhotoPlaceholder: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 30,
  },
  headerSection: {
    flex: 2,
    flexDirection: 'row',
    marginTop: 25,
  },
  headerTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#6387CB',
    textAlign: 'center',
  },
  headingAnalytics: {
    fontSize: 20,
    color: '#6387CB',
    textAlign: 'center',
  },
  sharingSection: {
    flex: 4,
  },
  analyticsSection: {
    flex: 10,
  },
});

export default HomeRecordingScreen;
