import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { TextInput, View } from 'react-native';

interface SearchBarProps {
  searchText: string;
  onSearchChange: (text: string) => void;
  placeholder?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({ 
  searchText, 
  onSearchChange, 
  placeholder = "Search tasks" 
}) => {
  return (
    <View style={searchBarStyles.container}>
      <Ionicons name="search" size={24} color={'#333'} />
      <TextInput 
        placeholder={placeholder}
        value={searchText}
        onChangeText={onSearchChange}
        style={searchBarStyles.input}
      />
    </View>
  );
};

export default SearchBar;

const searchBarStyles = {
  container: {
    backgroundColor: '#fff',
    flexDirection: 'row' as const,
    padding: 16,
    borderRadius: 10,
    gap: 10,
    marginBottom: 20,
    alignItems: 'center' as const,
    marginHorizontal: 40,
  },
  input: {
    flex: 1,
    fontSize: 16,
    padding: 0,
    margin: 0,
  }
};