// components/NavButton.tsx

import { Feather } from '@expo/vector-icons';
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { styles as globalStyles } from '../styles/globalStyles';

interface NavButtonProps {
  icon: keyof typeof Feather.glyphMap;
  label: string;
  target: string;
  isActive: boolean;
  onPress: (target: string) => void;
}

const NavButton: React.FC<NavButtonProps> = ({ icon, label, target, isActive, onPress }) => {
  return (
    <TouchableOpacity
      style={globalStyles.navButton}
      onPress={() => onPress(target)}
    >
      <Feather name={icon} size={24} color={isActive ? "#007AFF" : "#8E8E93"} />
      <Text style={[globalStyles.navLabel, { color: isActive ? "#007AFF" : "#8E8E93" }]}>{label}</Text>
    </TouchableOpacity>
  );
};

export default NavButton;