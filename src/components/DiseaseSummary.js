import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import DiseaseSummaryItem from './DiseaseSummaryItem';

const DiseaseSummary = ({ recordings }) => {
  useEffect(() => {}, []);
  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Disease Predictions</Text>
      <ScrollView style={styles.containerScroll}>
        {recordings &&
          recordings.map((recording) => (
            <DiseaseSummaryItem
              key={recording.id}
              timestamp={recording.data.timestamp}
              recordingDiseases={recording.data.diseasePredictions}
            />
          ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 20,
    color: '#881D1D',
    textAlign: 'center',
    fontFamily: 'Raleway_800ExtraBold',
    marginTop: 5,
    marginBottom: 5,
  },
  containerScroll: {
    width: 360,
  },
});

export default DiseaseSummary;
