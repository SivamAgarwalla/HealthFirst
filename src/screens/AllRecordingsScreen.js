import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Audio } from 'expo-av';
import { db, FirebaseContext } from '../context/FirebaseContext';
import RecordingListItem from '../components/RecordingListItem';
import { Divider } from 'react-native-elements';

const AllRecordingsScreen = () => {
  const [recordings, setRecordings] = useState(null);
  const firebase = useContext(FirebaseContext);
  const currentUser = firebase.getCurrentUser();

  useEffect(() => {
    db.collection('users')
      .doc(currentUser.uid)
      .collection('recordings')
      .orderBy('timestamp', 'desc')
      .onSnapshot((snapshot) =>
        setRecordings(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>All Recordings</Text>
      </View>
      <Divider />
      <ScrollView>
        {recordings &&
          recordings.map((recording) => (
            <RecordingListItem
              key={recording.data.audioRecordingUrl}
              recordingData={recording.data}
              recordingID={recording.id}
            />
          ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: '#ffffff',
    fontFamily: 'Raleway_400Regular',
  },
  headerTitle: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#881D1D',
    textAlign: 'center',
    marginBottom: 10,
    fontFamily: 'Raleway_800ExtraBold',
  },
});

export default AllRecordingsScreen;
