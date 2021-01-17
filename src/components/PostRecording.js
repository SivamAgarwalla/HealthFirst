import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Slider } from 'react-native-elements';
import { Button } from 'react-native-elements';

const PostRecording = ({
  recordingText,
  setGotRecording,
  setRecordingFormData,
  setSymptomFormComplete,
}) => {
  const [sicknessRating, setSicknessRating] = useState(1);
  const [painRating, setPainRating] = useState(1);
  const sampleRecText =
    'This is a sample text input which will be replaced by the users recording text when they have finished describing their symptoms. Hopefully when this is longer it does not leave the box!';

  const saveRecordingPressed = () => {
    const formData = {
      sicknessRating: sicknessRating,
      painRating: painRating,
    };
    setRecordingFormData(formData);
    setSymptomFormComplete(true);
    setGotRecording(false);
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Symptom Entry</Text>
      </View>
      <View style={styles.recordingCard}>
        <Text style={styles.recordingCardDate}>
          {new Date().toLocaleString()}
        </Text>
        <Text style={styles.recordingCardText}>
          {recordingText.replace(/\s+/g, ' ')}
        </Text>
      </View>
      <View style={styles.recordingForm}>
        <Text style={styles.sliderLabel}> Sickness Rating? (1-20)</Text>
        <Slider
          value={sicknessRating}
          minimumValue={1}
          maximumValue={20}
          minimumTrackTintColor={'#AC3834'}
          maximumTrackTintColor={'#CAB7A1'}
          step={1}
          trackStyle={{
            height: 10,
            width: 300,
            backgroundColor: 'transparent',
          }}
          thumbStyle={{ height: 20, width: 20 }}
          thumbTintColor={'#811112'}
          onSlidingComplete={(value) => setSicknessRating(value)}
        />
        <Text style={styles.sliderLabel}> Pain Rating? (1-20)</Text>
        <Slider
          value={painRating}
          minimumValue={1}
          maximumValue={20}
          minimumTrackTintColor={'#AC3834'}
          maximumTrackTintColor={'#CAB7A1'}
          step={1}
          trackStyle={{
            height: 10,
            width: 300,
            backgroundColor: 'transparent',
          }}
          thumbStyle={{ height: 20, width: 20 }}
          thumbTintColor={'#811112'}
          onSlidingComplete={(value) => setPainRating(value)}
        />
        <Button
          title='Save Recording'
          type='solid'
          raised={true}
          containerStyle={{
            width: 150,
            marginTop: 20,
          }}
          titleStyle={{
            fontFamily: 'Raleway_400Regular',
          }}
          buttonStyle={{
            backgroundColor: '#B29576',
          }}
          onPress={saveRecordingPressed}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 70,
    backgroundColor: 'white',
  },
  header: {
    flex: 2,
  },
  headerTitle: {
    fontSize: 45,
    color: '#881D1D',
    textAlign: 'center',
    fontFamily: 'Raleway_800ExtraBold',
  },
  recordingCard: {
    width: '90%',
    flex: 6,
    backgroundColor: 'white',
    shadowColor: '#cccccc',
    shadowOffset: {
      width: 2,
      height: 5,
    },
    shadowRadius: 10,
    shadowOpacity: 1.0,
    borderRadius: 10,
    padding: 10,
    marginTop: 20,
  },
  recordingCardDate: {
    fontSize: 22,
    fontWeight: '600',
    color: '#881D1D',
    textAlign: 'right',
    fontFamily: 'Raleway_600SemiBold',
  },
  recordingCardText: {
    fontSize: 20,
    color: '#881D1D',
    marginTop: 5,
    fontFamily: 'Raleway_400Regular',
  },
  recordingForm: {
    flex: 15,
    alignItems: 'center',
    marginTop: 40,
  },
  sliderLabel: {
    fontSize: 22,
    color: '#881D1D',
    fontFamily: 'Raleway_600SemiBold',
  },
});

export default PostRecording;
