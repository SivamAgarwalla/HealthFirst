import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ListItem } from 'react-native-elements';
import { Slider } from 'react-native-elements';

const DiseaseSummary = ({ timestamp, recordingDiseases }) => {
  return (
    <View containerStyle={styles.container}>
      <ListItem bottomDivider containerStyle={styles.containerListItem}>
        <ListItem.Content containerStyle={styles.containerListItem}>
          <ListItem.Title style={styles.listItemTitle}>
            {`Diseases Predictions - ${new Date(
              timestamp?.toDate()
            ).toLocaleString()}`}
          </ListItem.Title>
          {recordingDiseases.map((disease) => (
            <View
              style={{ flexDirection: 'column' }}
              key={`${timestamp}/${disease.predictionAccuracy}/${disease.commonName}`}
            >
              <View stlye={styles.eachDiseaseContainer}>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={styles.diseaseItemTitle}>
                    {`${disease.commonName}`}
                  </Text>
                  <Text
                    style={{
                      fontFamily: 'Raleway_600SemiBold',
                      alignItems: 'center',
                      fontSize: 14,
                    }}
                  >
                    {` (Probability - ${Number(
                      disease.predictionAccuracy.toFixed(2)
                    )}%)`}
                  </Text>
                </View>

                <Slider
                  value={disease.predictionAccuracy}
                  minimumValue={1}
                  maximumValue={100}
                  minimumTrackTintColor={'#AC3834'}
                  maximumTrackTintColor={'#CAB7A1'}
                  step={1}
                  trackStyle={{
                    height: 10,
                    width: 300,
                    backgroundColor: 'transparent',
                  }}
                  thumbStyle={{
                    backgroundColor: 'transparent',
                  }}
                  thumbTintColor={'#811112'}
                />
              </View>
            </View>
          ))}
        </ListItem.Content>
      </ListItem>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  containerListItem: {},
  listItemTitle: {
    fontFamily: 'Raleway_600SemiBold',
    alignItems: 'center',
    fontSize: 17,
    marginBottom: 2,
  },
  diseaseItemTitle: {
    fontFamily: 'Raleway_400Regular',
    alignItems: 'center',
    fontSize: 14,
  },
});

export default DiseaseSummary;
