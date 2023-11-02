import React from 'react';
import {ApplicationStackScreenProps} from '@/appTypes/navigation';
import {Box, Text} from '@/components/UI';
import moment from 'moment';
import {DATE_FORMATS} from '@/lib/moment/formats';
import {useTranslation} from 'react-i18next';
import {ScrollView} from 'react-native';

export default function TaskDetailScreen({
  route,
}: ApplicationStackScreenProps<'TaskDetail'>) {
  const {id, status, text, created} = route.params;
  const {t} = useTranslation('general');

  if (!id) {
    return null;
  }

  return (
    <ScrollView>
      <Box px="2" py="4">
        <Text>
          {t('created')}: {moment(created).format(DATE_FORMATS.fullDate)}
        </Text>
        <Text variant="h1" mt="2">
          {text}
        </Text>
        <Text mt="1">
          {t('status')}: {status}
        </Text>
      </Box>
    </ScrollView>
  );
}
