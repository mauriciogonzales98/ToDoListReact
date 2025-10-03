import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Image, TouchableOpacity, View } from 'react-native';

interface HeaderProps {
  onMenuPress: () => void;
  onProfilePress: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onMenuPress, onProfilePress }) => {
  return (
    <View style={headerStyles.container}>
      <TouchableOpacity onPress={onMenuPress}>
        <Ionicons name="menu" size={24} color={'#333'} />
      </TouchableOpacity>

      <TouchableOpacity onPress={onProfilePress}>
        <Image 
          source={{ uri: "https://xsgames.co/randomusers/avatar.php?g=male" }} 
          style={headerStyles.profileImage}
        />
      </TouchableOpacity>
    </View>
  );
};
export default Header;
const headerStyles = {
  container: {
    flexDirection: 'row' as const,
    justifyContent: 'space-between' as const,
    alignItems: 'center' as const,
    marginBottom: 20,
    paddingHorizontal: 40,
    paddingTop: 20,
  },
  profileImage: {
    width: 40, 
    height: 40, 
    borderRadius: 20
  }
};