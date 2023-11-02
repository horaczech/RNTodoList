import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import TaskScreen from '../../features/screens/TaskScreen';
import TaskDetailScreen from '@/features/screens/TaskDetailScreen';
import {ApplicationStackParamList} from '@/appTypes/navigation';
import {applicationStackOptions} from '@/navigation/options/stack-options';

const {Navigator, Screen} = createStackNavigator<ApplicationStackParamList>();

export default function ApplicationStack() {
  const initialRouteName: keyof ApplicationStackParamList = 'Tasks';

  return (
    <Navigator
      screenOptions={applicationStackOptions}
      initialRouteName={initialRouteName}>
      <Screen name="Tasks" component={TaskScreen} />
      <Screen
        name="TaskDetail"
        component={TaskDetailScreen}
        options={({route}) => ({title: route.params.text})}
      />
    </Navigator>
  );
}
