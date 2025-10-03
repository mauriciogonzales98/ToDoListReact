import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { TodoType } from '../types';

const initialTodoData = [
  { id: 1, title: "Buy groceries", isDone: false },
  { id: 2, title: "Walk the dog", isDone: true },
  { id: 3, title: "Read a book", isDone: false },
  { id: 4, title: "Write code", isDone: true },
];

export const useTodos = () => {
  const [todos, setTodos] = useState<TodoType[]>(initialTodoData);
  const [todoText, setTodoText] = useState<string>("");
  const [searchText, setSearchText] = useState<string>("");
  const [oldTodos, setOldTodos] = useState<TodoType[]>(initialTodoData);

  useEffect(() => {
    const getTodos = async () => {
      try {
        const todosString = await AsyncStorage.getItem('todos');
        if (todosString) {
          const todos = JSON.parse(todosString);
          setTodos(todos);
          setOldTodos(todos);
        }
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };
    getTodos();
  }, []);

  const addTodo = async () => {
    try {
      if (todoText.trim() === "") return;
      
      const newTodo = {
        id: Math.random(),
        title: todoText.trim(),
        isDone: false
      };
      const updatedTodos = [...todos, newTodo];
      setTodos(updatedTodos);
      setOldTodos(updatedTodos);
      await AsyncStorage.setItem('todos', JSON.stringify(updatedTodos));
      setTodoText("");
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  const deleteTodo = async (id: number) => {
    try {
      const newTodos = todos.filter((todo) => todo.id !== id);
      setTodos(newTodos);
      setOldTodos(newTodos);
      await AsyncStorage.setItem('todos', JSON.stringify(newTodos));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const handleDone = async (id: number) => {
    try {
      const newTodos = todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, isDone: !todo.isDone };
        }
        return todo;
      });
      setTodos(newTodos);
      setOldTodos(newTodos);
      await AsyncStorage.setItem('todos', JSON.stringify(newTodos));
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const onSearch = (text: string) => {
    setSearchText(text);
    if (text) {
      const filteredTodos = oldTodos.filter((todo) => 
        todo.title.toLowerCase().includes(text.toLowerCase())
      );
      setTodos(filteredTodos);
    } else {
      setTodos(oldTodos);
    }
  };

  return {
    todos,
    todoText,
    searchText,
    setTodoText,
    addTodo,
    deleteTodo,
    handleDone,
    onSearch,
  };
};