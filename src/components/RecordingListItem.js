import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Button, Badge } from 'react-native-elements';
import { Audio } from 'expo-av';
import { ListItem } from 'react-native-elements';

const RecordingListItem = ({ recordingData, recordingID }) => {
  const playButtonPressed = async () => {
    const audioURI = recordingData.audioRecordingUrl;
    const { sound } = await Audio.Sound.createAsync({ uri: audioURI });
    await sound.playAsync();
  };

  return (
    <>
      <View>
        <ListItem bottomDivider containerStyle={{ backgroundColor: '#ffffff' }}>
          <TouchableOpacity onPress={playButtonPressed}>
            <FontAwesome name='play' size={35} color='#AC3834' />
          </TouchableOpacity>
          <ListItem.Content>
            <ListItem.Title
              style={{
                fontFamily: 'Raleway_600SemiBold',
                alignItems: 'center',
                fontSize: 20,
              }}
            >
              {new Date(recordingData.timestamp?.toDate()).toLocaleString()}
            </ListItem.Title>
            <ListItem.Subtitle
              style={{ fontFamily: 'Raleway_400Regular', fontSize: 17 }}
            >{`"${recordingData.recordingText.replace(
              /\s+/g,
              ' '
            )}"`}</ListItem.Subtitle>
            <View style={styles.ratingFormChips}>
              <Badge
                value={`Pain Rating: ${recordingData.recordingFormInput.painRating}`}
                textStyle={{ fontSize: 15, fontFamily: 'Raleway_400Regular' }}
                badgeStyle={{
                  backgroundColor: '#CAB7A1',
                  height: 25,
                  width: 125,
                  marginRight: 8,
                }}
              />
              <Badge
                value={`Sickness Rating: ${recordingData.recordingFormInput.sicknessRating}`}
                textStyle={{ fontSize: 15, fontFamily: 'Raleway_400Regular' }}
                badgeStyle={{
                  backgroundColor: '#CAB7A1',
                  height: 26,
                  width: 125,
                }}
              />
            </View>
            <View style={styles.formChips}>
              {recordingData.symptomNames.map((symptomName) => (
                <Badge
                  key={`${recordingID}/${symptomName}`}
                  value={symptomName}
                  textStyle={{
                    fontSize: 15,
                    fontFamily: 'Raleway_400Regular',
                  }}
                  badgeStyle={{
                    backgroundColor: '#AC3834',
                    height: 26,
                    width: 90,
                    marginRight: 5,
                  }}
                />
              ))}
            </View>
          </ListItem.Content>
        </ListItem>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: '95%',
    shadowColor: '#000000',
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowRadius: 2,
    shadowOpacity: 1.0,
    borderRadius: 10,
    backgroundColor: '#f0f0f0',
    padding: 10,
    marginBottom: 10,
    marginLeft: 5,
  },
  cardDate: {
    fontSize: 19,
    fontWeight: '700',
    color: '#6387CB',
    textAlign: 'right',
    paddingBottom: 5,
  },
  textAndPlay: {
    paddingRight: 20,
    flex: 1,
    flexDirection: 'row',
  },
  recordingText: {
    fontSize: 17,
    color: '#6387CB',
    textAlign: 'left',
    paddingLeft: 10,
  },
  ratingFormChips: {
    flexDirection: 'row',
    alignItems: 'stretch',
    marginTop: 2,
  },
  formChips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'stretch',
    marginTop: 2,
    marginBottom: 2,
  },
  symptomName: {
    color: '#6387CB',
    fontSize: 19,
    fontWeight: '700',
  },
});

export default RecordingListItem;
