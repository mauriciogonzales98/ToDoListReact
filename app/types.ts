export type TodoType = {
  id: number;
  title: string;
  isDone: boolean;
}

export type TodoItemProps = {
  todo: TodoType;
  deleteTodo: (id: number) => void;
  handleDone: (id: number) => void;
};
