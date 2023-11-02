import {NavigatorScreenParams} from '@react-navigation/native';
import {TaskPreview} from '@/appTypes/task';
import {StackScreenProps} from '@react-navigation/stack';

export type RootNavigatorParamList = {
  ApplicationStack: NavigatorScreenParams<ApplicationStackParamList>;
};

export type ApplicationStackParamList = {
  Tasks: undefined;
  TaskDetail: TaskPreview;
};

export type ApplicationStackScreenProps<
  T extends keyof ApplicationStackParamList,
> = StackScreenProps<ApplicationStackParamList, T>;
