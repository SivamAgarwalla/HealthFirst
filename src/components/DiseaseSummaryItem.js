import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ListItem } from 'react-native-elements';

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
              <View
                stlye={styles.eachDiseaseContainer}
                style={{ flexDirection: 'row' }}
              >
                <Text style={{}}> {disease.commonName}</Text>
                <Text style={{}}> - </Text>
                <Text style={{}}>{disease.predictionAccuracy}</Text>
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
    fontSize: 18,
  },
});

export default DiseaseSummary;
