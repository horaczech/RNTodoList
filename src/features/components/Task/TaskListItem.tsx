import React from 'react';
import {TaskPreview} from '@/appTypes/task';
import {Box, Pressable, Text} from '@/components/UI';
import {BoxProps} from '@shopify/restyle';
import {Theme} from '@/theme/theme';
import {PixelRatio, StyleSheet} from 'react-native';
import moment from 'moment';
import {DATE_FORMATS} from '@/lib/moment/formats';
import Icon from 'react-native-vector-icons/Feather';
import globalStyles from '@/styles/global';

interface Props extends BoxProps<Theme> {
  data: TaskPreview;
  onTextPress: () => void;
  onEditPress: () => void;
}

export default function TaskListItem({
  data,
  onTextPress,
  onEditPress,
  ...otherProps
}: Props) {
  const isCompleted = data.status === 'done';
  return (
    <Box
      p="2"
      pl="1"
      borderBottomWidth={PixelRatio.roundToNearestPixel(2)}
      borderBottomColor="primary"
      backgroundColor={isCompleted ? 'disabled' : 'white'}
      flexDirection="row"
      {...otherProps}>
      <Pressable
        onPress={onTextPress}
        flexDirection="row"
        alignItems="center"
        style={[globalStyles.f1, styles.text]}>
        <Text mr="1">
          {moment(data.created).format(DATE_FORMATS.shortDate)}
        </Text>
        <Text
          variant="h2"
          ellipsizeMode="tail"
          numberOfLines={1}
          textDecorationLine={isCompleted ? 'line-through' : undefined}>
          {data.text}
        </Text>
      </Pressable>
      <Pressable style={globalStyles.mlAuto} onPress={onEditPress}>
        <Icon name="edit" size={20} />
      </Pressable>
    </Box>
  );
}

const styles = StyleSheet.create({
  text: {
    paddingRight: 40,
  },
});
