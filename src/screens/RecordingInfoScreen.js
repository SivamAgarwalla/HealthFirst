import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { db, FirebaseContext } from '../context/FirebaseContext';
import { Input, Card, Button } from 'react-native-elements';
import ContactInfo from '../components/ContactInfo';

const RecordingInfoScreen = () => {
  const [addPhoneNumber, setAddPhoneNumber] = useState('');
  const [doctorName, setDoctorName] = useState('');
  const [recordings, setRecordings] = useState(null);
  const firebase = useContext(FirebaseContext);
  const currentUser = firebase.getCurrentUser();
  const [contacts, setContacts] = useState(null);
  const [messageToSend, setMessageToSend] = useState('');

  useEffect(() => {
    db.collection('users')
      .doc(currentUser.uid)
      .collection('contacts')
      .onSnapshot((snapshot) =>
        setContacts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );
  }, []);

  useEffect(() => {
    let symptomSet = new Set();
    let messageToSendDoctor = 'Patient Name.\nSymptom List: ';
    db.collection('users')
      .doc(currentUser.uid)
      .collection('recordings')
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((recording) => {
          // doc.data() is never undefined for query doc snapshots
          const recordingData = recording.data();
          const symptomList = recordingData.symptomNames;
          symptomList.forEach((symptom) => {
            symptomSet.add(symptom);
          });
        });
      })
      .then(() => {
        for (let symptom of symptomSet) {
          messageToSendDoctor += symptom + ', ';
        }
        console.log(messageToSendDoctor);
        setMessageToSend(messageToSendDoctor);
      })
      .catch((error) => {
        console.log('Error getting recordings! ', error);
      });
  }, []);

  const saveDoctorContact = () => {
    db.collection('users')
      .doc(currentUser.uid)
      .collection('contacts')
      .doc()
      .set({
        doctorName: doctorName,
        phoneNumber: addPhoneNumber,
      })
      .then(() => {
        setDoctorName('');
        setAddPhoneNumber('');
      })
      .catch((error) => {
        console.error('Error adding contact! ', error);
      });
  };

  const sendHealthSummary = (contact) => {
    console.log(contact);
    const bodyText = 'Placeholder summary for the patient!';
    try {
      fetch(
        'https://us-central1-twilio-302002.cloudfunctions.net/TwilioFunction',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json, text/plain',
            'Content-type': 'application/json',
          },
          body: JSON.stringify({
            phoneNumber: `+1${contact.data.phoneNumber}`,
            bodyText: `${messageToSend}`,
          }),
        }
      )
        .then((response) => {
          console.log('DONE!');
        })
        .catch((error) => console.log(error));
    } catch (err) {
      console.log('There was an error reading file', error);
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.titleHeader}> Share Health Data </Text>
      <View style={styles.addNumberForm}>
        <Input
          containerStyle={styles.inputLabelContainer}
          placeholder='Doctors Name'
          onChangeText={(doctorName) => setDoctorName(doctorName)}
          value={doctorName}
        />
        <Input
          containerStyle={styles.inputLabelContainer}
          placeholder='Enter Number'
          onChangeText={(phoneNumber) => setAddPhoneNumber(phoneNumber.trim())}
          value={addPhoneNumber}
        />
        <Button
          title='Save Number'
          type='solid'
          onPress={saveDoctorContact}
          containerStyle={{
            width: 150,
          }}
          buttonStyle={{
            backgroundColor: '#881D1D',
          }}
          titleStyle={{
            fontFamily: 'Raleway_400Regular',
          }}
        />
      </View>
      <View style={styles.contactList}>
        <ScrollView>
          {contacts &&
            contacts.map((contact) => (
              <ContactInfo
                key={contact.id}
                contact={contact}
                sendHealthSummary={sendHealthSummary}
              />
            ))}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 50,
  },
  titleHeader: {
    fontSize: 40,
    color: '#881D1D',
    fontFamily: 'Raleway_800ExtraBold',
  },
  inputLabelContainer: {
    width: 320,
  },
  addNumberForm: {
    width: '90%',
    backgroundColor: 'white',
    shadowColor: '#cccccc',
    shadowOffset: {
      width: 2,
      height: 5,
    },
    shadowRadius: 10,
    shadowOpacity: 1.0,
    borderRadius: 10,
    padding: 15,
    marginTop: 20,
    alignItems: 'center',
  },
  contactList: {
    width: '95%',
  },
  contactCard: {
    alignItems: 'center',
  },
  doctorName: {
    fontSize: 20,
    color: '#881D1D',
    fontFamily: 'Raleway_600SemiBold',
  },
  phoneNumber: {
    fontSize: 16,
    color: '#881D1D',
    fontFamily: 'Raleway_600SemiBold',
    textAlign: 'center',
  },
});

export default RecordingInfoScreen;
