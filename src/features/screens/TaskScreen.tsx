import React, {useCallback, useState} from 'react';
import TaskList from '../components/Task/TaskList';
import {TaskPreview} from '@/appTypes/task';
import {View} from 'react-native';
import globalStyles from '@/styles/global';
import Empty from '@/features/components/Task/Empty';
import NewTaskModal from '@/features/components/Task/NewTaskModal';
import {ApplicationStackScreenProps} from '@/appTypes/navigation';

export default function TaskScreen({
  navigation,
}: ApplicationStackScreenProps<'Tasks'>) {
  const [tasks, setTasks] = useState<TaskPreview[]>([
    {
      id: 1,
      text: 'Big task no.1 with extremely long name',
      status: 'active',
      created: new Date('2023-10-01').toISOString(),
    },
    {
      id: 2,
      text: 'Task no.2',
      status: 'active',
      created: new Date('2023-10-02').toISOString(),
    },
  ]);
  const [showNewTaskModal, setShowNewTaskModal] = useState(false);
  const [modalInitialData, setModalInitialData] = useState<TaskPreview | null>(
    null,
  );

  const goToDetail = (id: number) => {
    if (id) {
      const currentTask = tasks.find(task => task.id === id);
      if (currentTask) {
        navigation.navigate('TaskDetail', currentTask);
      }
    }
  };

  const editTask = (id?: number) => {
    if (id) {
      const editedTask = tasks.find(task => task.id === id);
      if (editedTask) {
        setModalInitialData(editedTask);
      }
    } else {
      setModalInitialData(null);
    }
    setShowNewTaskModal(true);
  };

  const onModalClose = () => {
    setShowNewTaskModal(false);
    setModalInitialData(null);
  };

  const submitNewTask = useCallback(
    ({text, status}: Pick<TaskPreview, 'text' | 'status'>) => {
      if (text) {
        setTasks(current => {
          if (!modalInitialData?.id) {
            if (current.length === 0) {
              return [
                {
                  id: 1,
                  text,
                  status,
                  created: new Date().toISOString(),
                },
              ];
            }
            return [
              ...current,
              {
                id: current[current.length - 1].id + 1,
                text,
                status,
                created: new Date().toISOString(),
              },
            ];
          } else {
            const newTasks = [...current];
            const editIndex = newTasks.findIndex(
              task => task.id === modalInitialData.id,
            );
            if (editIndex > -1) {
              newTasks[editIndex].text = text;
              newTasks[editIndex].status = status;
            }
            return newTasks;
          }
        });
        onModalClose();
      }
    },
    [setTasks, modalInitialData],
  );

  const onRemoveTask = useCallback(
    (id: number) => {
      if (id) {
        setTasks(current => {
          if (current && current.length > 1) {
            const newTasks = [...current];
            const outIndex = current.findIndex(task => task.id === id);
            if (outIndex > -1) {
              newTasks.splice(outIndex, 1);
            }
            return newTasks;
          }
          return [];
        });
      }
    },
    [setTasks],
  );

  return (
    <View style={globalStyles.f1}>
      {!tasks || tasks.length === 0 ? (
        <Empty onPress={editTask} />
      ) : (
        <TaskList
          data={tasks}
          onEditTask={editTask}
          onTextPress={goToDetail}
          onRemove={onRemoveTask}
        />
      )}
      <NewTaskModal
        initialData={modalInitialData}
        onSubmit={submitNewTask}
        isOpen={showNewTaskModal}
        onClose={onModalClose}
      />
    </View>
  );
}
