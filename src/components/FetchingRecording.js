import React from 'react';
import { View, Text, Stylesheet } from 'react-native';

const FetchingRecording = () => {
  return (
    <View style={styles.container}>
      <Text styles={styles.loadingText}> Generating Recording Text </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'center',
  },
  loadingText: {
    fontSize: 45,
    color: '#881D1D',
    textAlign: 'center',
    fontFamily: 'Raleway_800ExtraBold',
  },
});

export default FetchingRecording;
