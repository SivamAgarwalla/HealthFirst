import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {
  Table,
  TableWrapper,
  Row,
  Rows,
  Col,
  Cols,
  Cell,
} from 'react-native-table-component';

const SymptomSummary = ({ recordings, setFormAverageData }) => {
  const [symptomTableHead, setSymptomTableHead] = useState([
    'Symptom',
    'Frequency',
  ]);
  const [symptomTableData, setSymptomTableData] = useState([]);
  useEffect(() => {
    let symptomToFrequency = new Map();
    let symptomSet = new Set();
    recordings.forEach((recording) => {
      const symptomList = recording.data.symptomNames;
      symptomList.forEach((symptom) => {
        symptomSet.add(symptom);
        if (symptomToFrequency.has(symptom)) {
          let currentCount = symptomToFrequency.get(symptom);
          symptomToFrequency.set(symptom, currentCount + 1);
        } else {
          symptomToFrequency.set(symptom, 1);
        }
      });
    });
    let tableData = [];
    symptomToFrequency.forEach((value, key) => tableData.push([key, value]));
    setSymptomTableData(tableData);
  }, []);
  useEffect(() => {
    let numberOfRecordings = 0;
    let averagePainRating = 0;
    let averageSicknessRating = 0;
    recordings.forEach((recording) => {
      averagePainRating += recording.data.recordingFormInput.painRating;
      averageSicknessRating += recording.data.recordingFormInput.sicknessRating;
      numberOfRecordings++;
    });
    averagePainRating = averagePainRating / numberOfRecordings;
    averageSicknessRating = averageSicknessRating / numberOfRecordings;
    setFormAverageData({
      painRating: Number(averagePainRating.toFixed(2)),
      sicknessRating: Number(averageSicknessRating.toFixed(2)),
    });
  }, []);

  return (
    <View style={styles.tableContainer}>
      <Table borderStyle={{ borderWidth: 2, borderColor: '#CAB7A1' }}>
        <Row
          data={symptomTableHead}
          style={styles.headStyle}
          textStyle={styles.headText}
        />
        <Rows
          data={symptomTableData}
          style={styles.bodyStyle}
          textStyle={styles.bodyText}
        />
      </Table>
    </View>
  );
};

const styles = StyleSheet.create({
  tableContainer: {
    marginTop: 15,
    width: '95%',
  },
  headStyle: {},
  headText: {
    fontSize: 17,
    color: '#881D1D',
    fontFamily: 'Raleway_600SemiBold',
    textAlign: 'center',
    margin: 5,
  },
  bodyStyle: {},
  bodyText: {
    fontSize: 15,
    fontFamily: 'Raleway_600SemiBold',
    textAlign: 'center',
    margin: 2,
  },
});

export default SymptomSummary;
