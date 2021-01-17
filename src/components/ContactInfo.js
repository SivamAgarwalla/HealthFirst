import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Input, Card, Button } from 'react-native-elements';

const ContactInfo = ({ contact, sendHealthSummary }) => {
  return (
    <View>
      <Card key={contact.id} containerStyle={styles.contactCard}>
        <Card.Title style={styles.doctorName}>
          {contact.data.doctorName}
        </Card.Title>
        <Text style={styles.phoneNumber}>{contact.data.phoneNumber}</Text>
        <Button
          title='Send Summary'
          type='solid'
          onPress={() => {
            sendHealthSummary(contact);
          }}
          containerStyle={{
            width: 200,
          }}
          buttonStyle={{
            backgroundColor: '#881D1D',
          }}
          titleStyle={{
            fontFamily: 'Raleway_400Regular',
          }}
        />
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
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

export default ContactInfo;
