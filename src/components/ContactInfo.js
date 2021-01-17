import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView, StatusBar } from 'react-native';
import { Input, Card, Button } from 'react-native-elements';


const ContactInfo = ({ contact, sendHealthSummary }) => {
    console.log("Contacts are " + contact.data)

  return (
      <View>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  contactCard: {
    alignItems: 'center',
    borderRadius: 8,
  },
  doctorName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#AC3834'
  },
  phoneNumber: {
    fontSize: 16,
    fontFamily: 'Raleway_600SemiBold',
    textAlign: 'center',
    color: '#CAB7A1'
  },
});

export default ContactInfo;
