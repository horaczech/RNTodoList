import React from 'react';
import {useSwipeableItemParams} from 'react-native-swipeable-item';
import {StyleSheet} from 'react-native';
import {Box, Pressable} from '@/components/UI';
import globalStyles from '@/styles/global';
import Icon from 'react-native-vector-icons/Feather';

interface Props {
  closeCallback: () => void;
}

export default function UnderlayLeft({closeCallback}: Props) {
  const {close} = useSwipeableItemParams();

  const onPress = async () => {
    await close();
    closeCallback();
  };

  return (
    <Box style={styles.container}>
      <Pressable
        onPress={onPress}
        style={[
          globalStyles.alignEnd,
          globalStyles.justifyCenter,
          globalStyles.h100,
        ]}>
        <Icon name="x" size={45} color="white" />
      </Pressable>
    </Box>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'red',
    flex: 1,
    paddingRight: 10,
  },
});
