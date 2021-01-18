import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomeRecordingScreen from '../screens/HomeRecordingScreen';
import AllRecordingsScreen from '../screens/AllRecordingsScreen';
import RecordingInfoScreen from '../screens/RecordingInfoScreen';
import ProfileMetricsScreen from '../screens/ProfileMetricsScreen';

const MainStackScreens = () => {
  const MainStack = createBottomTabNavigator();

  const tabBarOptions = {
    showLabel: false,
    style: {
      backgroundColor: '#ffffff',
    },
  };

  const screenOptions = ({ route }) => ({
    tabBarIcon: ({ focused }) => {
      let iconName = 'ios-home';

      switch (route.name) {
        case 'HomeRecording':
          iconName = 'ios-home';
          break;
        case 'AllRecordings':
          iconName = 'ios-list';
          break;
        case 'RecordingInfo':
          iconName = 'ios-information';
          break;
        case 'ProfileMetrics':
          iconName = 'ios-person';
          break;
        default:
          iconName = 'ios-home';
      }
      return (
        <Ionicons
          name={iconName}
          size={24}
          color={focused ? '#881D1D' : '#CAB7A1'}
        />
      );
    },
  });

  return (
    <MainStack.Navigator
      headerMode='none'
      tabBarOptions={tabBarOptions}
      screenOptions={screenOptions}
    >
      <MainStack.Screen name='HomeRecording' component={HomeRecordingScreen} />
      <MainStack.Screen name='AllRecordings' component={AllRecordingsScreen} />
      <MainStack.Screen name='RecordingInfo' component={RecordingInfoScreen} />
      <MainStack.Screen
        name='ProfileMetrics'
        component={ProfileMetricsScreen}
      />
    </MainStack.Navigator>
  );
};

export default MainStackScreens;
