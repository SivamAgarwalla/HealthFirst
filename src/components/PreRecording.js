import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const PreRecording = ({ handleOnPressIn, handleOnPressOut, isRecording }) => {
  return (
    <View style={styles.homeContainer}>
      <View style={styles.title}>
        <Text style={styles.titleHeader}>Feeling Sick?</Text>
      </View>

      <View style={styles.recordingMic}>
        <TouchableOpacity
          onPressIn={handleOnPressIn}
          onPressOut={handleOnPressOut}
        >
          <View
            style={
              isRecording
                ? styles.recordingMicBackground
                : styles.notRecordingMicBackground
            }
          >
            <FontAwesome name='microphone' size={130} color='#f0f0f0' />
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.bottom}>
        <Text style={styles.bottomText}>
          Press and hold the record button to start a symptom entry.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  title: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleHeader: {
    fontSize: 50,
    color: '#881D1D',
    fontFamily: 'Raleway_800ExtraBold',
  },
  recordingMic: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  recordingMicBackground: {
    borderRadius:
      Math.round(
        Dimensions.get('window').width + Dimensions.get('window').height
      ) / 2,
    width: Dimensions.get('window').width * 0.7,
    height: Dimensions.get('window').width * 0.7,

    backgroundColor: '#CAB7A1',
    justifyContent: 'center',
    alignItems: 'center',
    //shadowOffset: { width: 5, height: 10 },
    //shadowColor: '#ccc',
    //shadowOpacity: 0.75,
  },
  notRecordingMicBackground: {
    borderRadius:
      Math.round(
        Dimensions.get('window').width + Dimensions.get('window').height
      ) / 2,
    width: Dimensions.get('window').width * 0.7,
    height: Dimensions.get('window').width * 0.7,
    backgroundColor: '#B29576',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottom: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '85%',
  },
  bottomText: {
    fontSize: 25,
    color: '#881D1D',
    textAlign: 'center',
    fontFamily: 'Raleway_600SemiBold',
  },
});

export default PreRecording;
