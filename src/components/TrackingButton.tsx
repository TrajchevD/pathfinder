import React from 'react';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { Colors } from '../constants/colors';

interface Props {
  isTracking: boolean;
  onStart: () => void;
  onStop: () => void;
}

const Container = styled.View`
  padding-horizontal: 16px;
  margin-bottom: 16px;
`;

const ButtonText = styled.Text`
  color: ${Colors.text};
  font-size: 18px;
  font-weight: bold;
`;

export function TrackingButton({ isTracking, onStart, onStop }: Props) {
  return (
    <Container>
      <TouchableOpacity
        onPress={isTracking ? onStop : onStart}
        style={{
          backgroundColor: isTracking ? Colors.danger : Colors.primary,
          paddingVertical: 16,
          borderRadius: 16,
          alignItems: 'center',
          shadowColor: isTracking ? Colors.danger : Colors.primary,
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.4,
          shadowRadius: 8,
          elevation: 6,
        }}
      >
        <ButtonText>
          {isTracking ? '⏹  Stop & Save' : '▶  Start Tracking'}
        </ButtonText>
      </TouchableOpacity>
    </Container>
  );
}