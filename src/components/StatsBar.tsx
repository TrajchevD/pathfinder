import React from 'react';
import styled from 'styled-components/native';
import { useTrackingStore } from '../store/useTrackingStore';
import { haversineDistance, formatDistance, formatDuration } from '../utils/distance';
import { Colors } from '../constants/colors';

const Container = styled.View`
  flex-direction: row;
  justify-content: space-around;
  background-color: ${Colors.card};
  padding-vertical: 16px;
  padding-horizontal: 24px;
  border-radius: 16px;
  margin-horizontal: 16px;
  margin-bottom: 12px;
`;

const StatBlock = styled.View`
  align-items: center;
`;

const Label = styled.Text`
  color: ${Colors.textMuted};
  font-size: 12px;
  margin-bottom: 4px;
  letter-spacing: 1px;
`;

const Value = styled.Text`
  color: ${Colors.text};
  font-size: 24px;
  font-weight: bold;
`;

const Divider = styled.View`
  width: 1px;
  background-color: ${Colors.border};
`;

export function StatsBar() {
  const { elapsedSeconds, coordinates } = useTrackingStore();
  const distance = haversineDistance(coordinates);

  return (
    <Container>
      <StatBlock>
        <Label>DURATION</Label>
        <Value>{formatDuration(elapsedSeconds)}</Value>
      </StatBlock>
      <Divider />
      <StatBlock>
        <Label>DISTANCE</Label>
        <Value>{formatDistance(distance)}</Value>
      </StatBlock>
    </Container>
  );
}