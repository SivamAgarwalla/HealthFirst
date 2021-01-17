import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { db, FirebaseContext } from '../context/FirebaseContext';
import { UserContext } from '../context/UserContext';
import { Button } from 'react-native-elements';
import { AntDesign } from '@expo/vector-icons';
import SymptomSummary from '../components/SymptomSummary';
import DiseaseSummary from '../components/DiseaseSummary';
import ProfileHeader from '../components/ProfileHeader';

const ProfileMetricScreen = () => {
  const [user, setUser] = useContext(UserContext);
  const firebase = useContext(FirebaseContext);
  const currentUser = firebase.getCurrentUser();
  const [userData, setUserData] = useState(null);
  const [recordings, setRecordings] = useState(null);
  const [formAverageData, setFormAverageData] = useState({});

  const logOut = async () => {
    const loggedOut = await firebase.logOut();

    if (loggedOut) {
      setUser((state) => ({ ...state, isLoggedIn: false }));
    }
  };

  useEffect(() => {
    db.collection('users')
      .doc(currentUser.uid)
      .collection('recordings')
      .onSnapshot((snapshot) =>
        setRecordings(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );
  }, []);

  useEffect(() => {
    const getUserInfo = async () => {
      const userData = await firebase.getUserInfo(currentUser.uid);
      setUserData(userData);
    };
    getUserInfo();
  }, []);

  return (
    <View style={styles.container}>
      {userData && (
        <ProfileHeader userData={userData} formAverageData={formAverageData} />
      )}
      {recordings && (
        <>
          <SymptomSummary
            recordings={recordings}
            setFormAverageData={setFormAverageData}
          />
          <DiseaseSummary recordings={recordings} />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    alignItems: 'center',
  },
});

export default ProfileMetricScreen;
