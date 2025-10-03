import { Ionicons } from '@expo/vector-icons';
import { Checkbox } from 'expo-checkbox';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { TodoItemProps } from '../types';

export const TodoItem: React.FC<TodoItemProps> = ({ todo, deleteTodo, handleDone }) => {
  const handleDelete = () => {
    deleteTodo(todo.id);
    alert("Deleted " + todo.id);
  };

  return (
    <View style={todoItemStyles.container}>
      <View style={todoItemStyles.info}>
        <Checkbox 
          value={todo.isDone} 
          onValueChange={() => handleDone(todo.id)}
          color={todo.isDone ? '#4630eb' : undefined}
        />
        <Text style={[
          todoItemStyles.text, 
          todo.isDone && todoItemStyles.completedText
        ]}>
          {todo.title}
        </Text>
      </View>
      <TouchableOpacity onPress={handleDelete}>
        <Ionicons name="trash" size={24} color={'red'} />
      </TouchableOpacity>
    </View>
  );
};

export default TodoItem;

const todoItemStyles = {
  container: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 10,
    marginBottom: 20,
    flexDirection: 'row' as const,
    justifyContent: 'space-between' as const,
    alignItems: 'center' as const,
  },
  info: {
    flexDirection: 'row' as const,
    gap: 10,
    alignItems: 'center' as const,
    flex: 1,
  },
  text: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  completedText: {
    textDecorationLine: 'line-through' as const,
  }
};