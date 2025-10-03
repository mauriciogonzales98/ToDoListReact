import React from 'react';
import { FlatList } from 'react-native';
import { TodoType } from '../types';
import { TodoItem } from './todoItem';

interface TodoListProps {
  todos: TodoType[];
  deleteTodo: (id: number) => void;
  handleDone: (id: number) => void;
}

export const TodoList: React.FC<TodoListProps> = ({ todos, deleteTodo, handleDone }) => {
  return (
    <FlatList 
      data={[...todos].reverse()}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <TodoItem 
          todo={item} 
          deleteTodo={deleteTodo} 
          handleDone={handleDone}
        />
      )}
      contentContainerStyle={todoListStyles.content}
      style={todoListStyles.list}
    />
  );
};

export default TodoList;

const todoListStyles = {
  list: {
    flex: 1,
  },
  content: {
    paddingBottom: 10,
  }
};