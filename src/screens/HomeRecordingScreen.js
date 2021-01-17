import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Audio } from 'expo-av';
import { FirebaseContext } from '../context/FirebaseContext';
import * as FileSystem from 'expo-file-system';
import PreRecording from '../components/PreRecording';
import PostRecording from '../components/PostRecording';
import recordingOptions from '../util/recordingOptions';
import symptomBank from '../util/parseRecordingSymptoms';
import axios from 'axios';

const HomeRecordingScreen = ({ navigation }) => {
  const firebase = useContext(FirebaseContext);
  const [recording, setRecording] = React.useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [gotRecording, setGotRecording] = useState(false);
  const [query, setQuery] = useState('');
  const [recordingFormData, setRecordingFormData] = useState({});
  const [symptomFormComplete, setSymptomFormComplete] = useState(false);
  const [symptomNames, setSymptomNames] = useState([]);
  const [diseasePredictions, setDiseasePredictions] = useState([]);

  const determineArrayOfSymptomIndexes = (transcribedRecordingText) => {
    let symptomNameToID = new Map();
    symptomBank.forEach((symptomObject) => {
      let symptomName = symptomObject.Name;
      let symptomId = symptomObject.ID;
      let formattedSymptomName = symptomName.toLowerCase().replaceAll(' ', '_');
      symptomNameToID.set(formattedSymptomName, { symptomId, symptomName });
    });
    let formattedTranscribing = transcribedRecordingText
      .toLowerCase()
      .replaceAll(' ', '_');
    const presentSymptonIDs = [];
    const presentSymptonNames = [];
    for (const [key, value] of symptomNameToID.entries()) {
      if (formattedTranscribing.includes(key)) {
        presentSymptonIDs.push(value.symptomId);
        presentSymptonNames.push(value.symptomName);
      }
    }
    const presentSymptonIDsString = presentSymptonIDs.toString();
    setSymptomNames(presentSymptonNames);
    const options = {
      method: 'GET',
      url: 'https://priaid-symptom-checker-v1.p.rapidapi.com/diagnosis',
      params: {
        symptoms: `[${presentSymptonIDsString}]`,
        gender: 'male',
        year_of_birth: '2000',
        language: 'en-gb',
      },
      headers: {
        'x-rapidapi-key': 'c835bd7eecmsh5d5907a802f7087p1dae05jsn2258634f60e7',
        'x-rapidapi-host': 'priaid-symptom-checker-v1.p.rapidapi.com',
      },
    };
    axios
      .request(options)
      .then((response) => {
        const diseaseResponseArray = response.data;
        const diseasePredictions = [];
        diseaseResponseArray.forEach((diseaseObject) => {
          const diseaseImportantFields = {
            predictionAccuracy: diseaseObject.Issue.Accuracy,
            formalDescription: diseaseObject.Issue.IcdName,
            formalName: diseaseObject.Issue.ProfName,
            commonName: diseaseObject.Issue.Name,
          };
          diseasePredictions.push(diseaseImportantFields);
        });
        setDiseasePredictions(diseasePredictions);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  useEffect(() => {}, []);

  useEffect(() => {
    if (symptomFormComplete) {
      saveRecordingToFirebase();
    }
  }, [symptomFormComplete]);

  const saveRecordingToFirebase = async () => {
    try {
      await firebase.createAudioRecording({
        recording: recording,
        recordingText: query,
        recordingFormData: recordingFormData,
        symptomNames: symptomNames,
        diseasePredictions: diseasePredictions,
      });
    } catch (error) {
      console.log('Error saving the recording for the user ! ', error);
    }
  };

  const startRecording = async () => {
    try {
      await Audio.requestPermissionsAsync();
      setIsRecording(true);
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });
      const recording = new Audio.Recording();
      await recording.prepareToRecordAsync(recordingOptions);
      await recording.startAsync();
      setRecording(recording);
    } catch (error) {
      console.error('Failed to start recording', error);
      await stopRecording();
    }
  };

  const stopRecording = async () => {
    setIsRecording(false);
    try {
      await recording.stopAndUnloadAsync();
    } catch (error) {
      console.log('Error with stop and unload async method.');
    }
  };

  const handleOnPressIn = () => {
    startRecording();
  };

  const getTranscription = async () => {
    try {
      const info = await FileSystem.getInfoAsync(recording.getURI());
      const uri = info.uri;
      const formData = new FormData();
      formData.append('file', {
        uri,
        type: 'audio/x-wav',
        name: 'speech2text',
      });
      const response = await fetch(
        'https://us-central1-voicememo-301706.cloudfunctions.net/audioToText',
        {
          method: 'POST',
          body: formData,
        }
      );
      const data = await response.json();
      determineArrayOfSymptomIndexes(data.transcript.replace(/\s+/g, ' '));
      setQuery(data.transcript);
      return data.transcript;
    } catch (error) {
      console.log('There was an error reading file', error);
    }
  };

  const handleOnPressOut = async () => {
    stopRecording();
    getTranscription().then(async (data) => {
      setSymptomFormComplete(false);
      setGotRecording(true);
    });
  };

  return (
    <View style={styles.homeContainer}>
      {!gotRecording && (
        <PreRecording
          handleOnPressIn={handleOnPressIn}
          handleOnPressOut={handleOnPressOut}
          isRecording={isRecording}
        />
      )}
      {gotRecording && (
        <PostRecording
          recordingText={query}
          setGotRecording={setGotRecording}
          setRecordingFormData={setRecordingFormData}
          setSymptomFormComplete={setSymptomFormComplete}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
  },
});

export default HomeRecordingScreen;
