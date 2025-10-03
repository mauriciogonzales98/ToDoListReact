import { Ionicons } from '@expo/vector-icons';
import React, { RefObject } from 'react';
import { TextInput, TouchableOpacity, View } from 'react-native';

interface TodoInputProps {
  todoText: string;
  onTodoTextChange: (text: string) => void;
  onAddTodo: () => void;
  onBlur: () => void;
  onFocus: () => void;
  inputRef: RefObject<TextInput | null>;
}

export const TodoInput: React.FC<TodoInputProps> = ({
  todoText,
  onTodoTextChange,
  onAddTodo,
  onBlur,
  onFocus,
  inputRef
}) => {
  return (
    <View style={todoInputStyles.container}>
      <TouchableOpacity 
        style={todoInputStyles.inputContainer}
        onPress={onFocus}
        activeOpacity={1}
      >
        <TextInput 
          ref={inputRef}
          placeholder="Add a new task" 
          value={todoText}
          onChangeText={onTodoTextChange} 
          onBlur={onBlur}
          style={todoInputStyles.input} 
          autoCorrect={false}
          returnKeyType="done"
          onSubmitEditing={onAddTodo}
          showSoftInputOnFocus={true}
          caretHidden={false}
          blurOnSubmit={false}
        />
      </TouchableOpacity>
      <TouchableOpacity style={todoInputStyles.button} onPress={onAddTodo}>
        <Ionicons name="add" size={34} color={'#fff'} />
      </TouchableOpacity>
    </View>
  );
};

export default TodoInput;

const todoInputStyles = {
  container: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    gap: 10,
    justifyContent: 'space-between' as const,
    paddingTop: 10,
    backgroundColor: '#f5f5f5',
    paddingBottom: 10,
  },
  inputContainer: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  input: {
    backgroundColor: '#fff',
    flex: 1,
    padding: 16,
    borderRadius: 10,
    fontSize: 16,
    color: '#333',
    minHeight: 50,
    includeFontPadding: true,
    textAlignVertical: 'center' as const,
  },
  button: {
    backgroundColor: '#3838bbff',
    padding: 8,
    borderRadius: 10,
    marginLeft: 20,
    minHeight: 50,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
    minWidth: 50,
  }
};