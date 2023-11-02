import React, {useCallback} from 'react';
import TaskListItem from './TaskListItem';
import {TaskPreview} from '@/appTypes/task';
import {FlashList, ListRenderItemInfo} from '@shopify/flash-list';
import {Pressable} from '@/components/UI';
import {PixelRatio, View} from 'react-native';
import globalStyles from '@/styles/global';
import Icon from 'react-native-vector-icons/Feather';
import SwipeableItem from 'react-native-swipeable-item';
import UnderlayLeft from '@/features/components/Task/UnderlayLeft';

interface Props {
  data: TaskPreview[] | null;
  onEditTask: (id?: number) => void;
  onTextPress: (id: number) => void;
  onRemove: (id: number) => void;
}

export default function TaskList({
  data,
  onTextPress,
  onEditTask,
  onRemove,
}: Props) {
  const renderItem = useCallback(
    ({item, index}: ListRenderItemInfo<TaskPreview>) => {
      return (
        <SwipeableItem
          item={item}
          key={item.id}
          swipeEnabled
          snapPointsLeft={[100]}
          activationThreshold={1}
          renderUnderlayLeft={() => (
            <UnderlayLeft closeCallback={() => onRemove(item.id)} />
          )}>
          <TaskListItem
            data={item}
            onTextPress={() => onTextPress(item.id)}
            onEditPress={() => onEditTask(item.id)}
            borderTopWidth={index === 0 ? PixelRatio.roundToNearestPixel(2) : 0}
            borderTopColor={index === 0 ? 'primary' : undefined}
          />
        </SwipeableItem>
      );
    },
    [onRemove, onEditTask, onTextPress],
  );

  return (
    <View style={globalStyles.f1}>
      <Pressable
        style={globalStyles.mlAuto}
        mt="2"
        mr="2"
        mb="4"
        onPress={onEditTask}
        borderRadius="md"
        width={30}
        height={30}
        alignItems="center"
        justifyContent="center"
        borderColor="primary"
        borderWidth={2}>
        <Icon name="plus" size={24} />
      </Pressable>
      <FlashList
        data={data}
        keyExtractor={item => item.id?.toString()}
        renderItem={renderItem}
        estimatedItemSize={10}
      />
    </View>
  );
}
