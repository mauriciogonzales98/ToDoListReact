import React, { useRef } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  TouchableWithoutFeedback
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Cambia las importaciones a app/components/
import { Header } from './components/header';
import { SearchBar } from './components/searchBar';
import { TodoInput } from './components/todoInput';
import { TodoList } from './components/todoList';
import { useTodos } from './hooks/useTodos';
import { styles } from './styles';

export default function Index() {
  const {
    todos,
    todoText,
    searchText,
    setTodoText,
    addTodo,
    deleteTodo,
    handleDone,
    onSearch,
  } = useTodos();

  const textInputRef = useRef<TextInput>(null);

  const handleBlur = async () => {
    if (todoText.trim() !== "") {
      await addTodo();
    }
    Keyboard.dismiss();
  };

  const focusTextInput = () => {
    textInputRef.current?.focus();
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const handleMenuPress = () => {
    alert('Menu clicked');
  };

  const handleProfilePress = () => {
    alert('Profile clicked');
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard} accessible={false}>
      <SafeAreaView style={styles.container}>
        <Header 
          onMenuPress={handleMenuPress}
          onProfilePress={handleProfilePress}
        />
        
        <SearchBar 
          searchText={searchText}
          onSearchChange={onSearch}
        />

        <KeyboardAvoidingView 
          style={styles.keyboardAvoidingView}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
        >
          <TodoList 
            todos={todos}
            deleteTodo={deleteTodo}
            handleDone={handleDone}
          />
          
          <TodoInput 
            todoText={todoText}
            onTodoTextChange={setTodoText}
            onAddTodo={addTodo}
            onBlur={handleBlur}
            onFocus={focusTextInput}
            inputRef={textInputRef}
          />
        </KeyboardAvoidingView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}