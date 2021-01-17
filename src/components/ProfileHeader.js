import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
const ProfileHeader = ({ userData, formAverageData }) => {
  return (
    <View style={styles.profileContainer}>
      <View style={styles.profilePhotoContainer}>
        {userData.profilePhotoUrl !== 'default' ? (
          <Image
            source={{ uri: userData.profilePhotoUrl }}
            style={styles.profilePhoto}
          ></Image>
        ) : (
          <View style={styles.profilePhotoPlaceholder}>
            <AntDesign name='plus' size={24} color='#ffffff' />
          </View>
        )}
      </View>
      <View style={styles.profileHeader}>
        <Text style={styles.headerTitle}>{` Hello ${userData.username}`}</Text>
        <Text
          style={styles.headingAnalytics}
        >{` Pain Rating - ${formAverageData.painRating}`}</Text>
        <Text
          style={styles.headingAnalytics}
        >{` Sickness Rating - ${formAverageData.sicknessRating}`}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  profileContainer: {
    flexDirection: 'row',
    paddingTop: 15,
    justifyContent: 'center',
  },
  profilePhotoContainer: {
    width: 100,
    height: 100,
    backgroundColor: '#881D1D',
    borderRadius: 50,
    alignSelf: 'center',
    overflow: 'hidden',
  },
  profilePhoto: {
    flex: 1,
  },
  profilePhotoPlaceholder: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 30,
  },
  profileHeader: {
    paddingTop: 15,
  },
  headerTitle: {
    fontSize: 25,
    color: '#881D1D',
    textAlign: 'center',
    fontFamily: 'Raleway_800ExtraBold',
  },
  headingAnalytics: {
    fontSize: 20,
    color: '#881D1D',
    textAlign: 'center',
    fontFamily: 'Raleway_600SemiBold',
  },
});

export default ProfileHeader;
