import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Checkbox } from "expo-checkbox";
import { useEffect, useRef, useState } from "react";
import {
  FlatList,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type TodoType = {
  id: number;
  title: string;
  isDone: boolean;
}

export default function Index() {

  const todoData =[
    { id: 1, title: "Buy groceries", isDone: false },
    { id: 2, title: "Walk the dog", isDone: true },
    { id: 3, title: "Read a book", isDone: false },
    { id: 4, title: "Write code", isDone: true },
  ]
  
  const [todos, setTodos] = useState<TodoType[]>(todoData);
  const [todoText, setTodoText] = useState<string>("");
  const [searchText, setSearchText] = useState<string>("");
  const [oldTodos, setOldTodos] = useState<TodoType[]>(todoData);
  const textInputRef = useRef<TextInput>(null);

  useEffect(() => {
    const getTodos = async () => {
      try{
        const todosString = await AsyncStorage.getItem('todos');
        if(todosString){
          const todos = JSON.parse(todosString);
          setTodos(todos);
          setOldTodos(todos);
        }
      }
      catch(error){
        console.error("Error fetching todos:", error);
      }
    };
    getTodos();
  }, []);

  const addTodo = async () => {
    try{
      if(todoText.trim() === "") return;
      
      const newTodo = {
        id: Math.random(),
        title: todoText.trim(),
        isDone: false
      }
      const updatedTodos = [...todos, newTodo];
      setTodos(updatedTodos);
      setOldTodos(updatedTodos);
      await AsyncStorage.setItem('todos', JSON.stringify(updatedTodos));
      setTodoText("");
    }
    catch(error){
      console.error("Error adding todo:", error);
    }
  };

  const handleBlur = async () => {
    if(todoText.trim() !== "") {
      await addTodo();
    }
    Keyboard.dismiss();
  };

  const deleteTodo = async (id: number) => {
    try{
      const newTodos = todos.filter((todo) => todo.id !== id);
      setTodos(newTodos);
      setOldTodos(newTodos);
      await AsyncStorage.setItem('todos', JSON.stringify(newTodos));
    }
    catch(error){
      console.error("Error deleting todo:", error);
    }
  }

  const handleDone = async (id: number) => {
    try{
      const newTodos = todos.map((todo) => {
        if(todo.id === id){
          return {...todo, isDone: !todo.isDone};
        }
        return todo;
      });
      setTodos(newTodos);
      setOldTodos(newTodos);
      await AsyncStorage.setItem('todos', JSON.stringify(newTodos));
    }
    catch(error){
      console.error("Error updating todo:", error);
    }
  }

  const onSearch = (text: string) => {
    setSearchText(text);
    if(text){
      const filteredTodos = oldTodos.filter((todo) => 
        todo.title.toLowerCase().includes(text.toLowerCase())
      );
      setTodos(filteredTodos);
    }
    else{
      setTodos(oldTodos);
    }
  }

  const focusTextInput = () => {
    textInputRef.current?.focus();
  }

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  }

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard} accessible={false}>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => {alert('Menu clicked')}}>
            <Ionicons name="menu" size={24} color={'#333'}></Ionicons>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => {alert('Profile clicked')}}>
            <Image source={{uri: "https://xsgames.co/randomusers/avatar.php?g=male"}} 
              style={{width:40, height: 40, borderRadius:20}}>
            </Image>
          </TouchableOpacity>
        </View>
      
        <View style={styles.searchBar}>
          <Ionicons name="search" size={24} color={'#333'}></Ionicons>
          <TextInput 
            placeholder="Search tasks" 
            value={searchText}
            onChangeText={(text) => onSearch(text)}
            style={styles.searchInput}
          />
        </View>

        <KeyboardAvoidingView 
          style={styles.keyboardAvoidingView}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
        >
          <FlatList 
            data={[...todos].reverse()}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({item}) => (
              <ToDoItem todo={item} deleteTodo={deleteTodo} handleDone={handleDone}/>
            )}
            contentContainerStyle={styles.flatListContent}
            style={styles.flatList}
          />
          
          <View style={styles.footer}>
            <TouchableOpacity 
              style={styles.inputContainer}
              onPress={focusTextInput}
              activeOpacity={1}
            >
              <TextInput 
                ref={textInputRef}
                placeholder="Add a new task" 
                value={todoText}
                onChangeText={(text) => setTodoText(text)} 
                onBlur={handleBlur}
                style={styles.newTodoInput} 
                autoCorrect={false}
                returnKeyType="done"
                onSubmitEditing={addTodo}
                showSoftInputOnFocus={true}
                caretHidden={false}
                blurOnSubmit={false}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.addButton} onPress={addTodo}>
              <Ionicons name="add" size={34} color={'#fff'} />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const ToDoItem = 
  ({ todo, deleteTodo, handleDone } : 
  { todo:TodoType; 
    deleteTodo:(id:number) => void;
    handleDone:(id:number) => void;
  }) => {
  return(
    <View style={styles.todoInfoContainer}>
      <View style={styles.todoInfo}>
        <Checkbox 
          value={todo.isDone} 
          onValueChange={() => handleDone(todo.id)}
          color={todo.isDone ? '#4630eb' : undefined}
        />
        <Text style={[styles.todoText, todo.isDone && {textDecorationLine: 'line-through'}]}>
          {todo.title}
        </Text>
      </View>
      <TouchableOpacity onPress={() => { deleteTodo(todo.id); alert("Deleted " + todo.id) }}>
        <Ionicons name="trash" size={24} color={'red'} />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  keyboardAvoidingView: {
    flex: 1,
    padding: 40,
  },
  header:  {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 40,
    paddingTop: 20,
  },
  searchBar: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    padding: 16,
    borderRadius: 10,
    gap: 10,
    marginBottom: 20,
    alignItems: 'center',
    marginHorizontal: 40,
  },
  searchInput:{
    flex: 1,
    fontSize: 16,
    padding: 0,
    margin: 0,
  },
  flatList: {
    flex: 1,
  },
  flatListContent: {
    paddingBottom: 10,
  },
  todoInfoContainer: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 10,
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  todoInfo:{
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    flex: 1,
  },
  todoText: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    justifyContent: 'space-between',
    paddingTop: 10,
    backgroundColor: '#f5f5f5',
    paddingBottom: 10,
  },
  inputContainer: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  newTodoInput: {
    backgroundColor: '#fff',
    flex: 1,
    padding: 16,
    borderRadius: 10,
    fontSize: 16,
    color: '#333',
    minHeight: 50,
    includeFontPadding: true,
    textAlignVertical: 'center',
  },
  addButton: {
    backgroundColor: '#3838bbff',
    padding: 8,
    borderRadius: 10,
    marginLeft: 20,
    minHeight: 50,
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 50,
  }
});