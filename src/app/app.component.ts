import { Component } from '@angular/core';

type Todo = {
  id: number;
  title: string;
  done?: boolean;
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  todoInput = '';
  todos: Todo[] = [];
  openModal: boolean = false;
  selectedTodo: Todo | null = null;

  getTodos() {
    const todosInLocalStorage = localStorage.getItem('todos');
    if (todosInLocalStorage) {
      const todosFormattedData = JSON.parse(todosInLocalStorage);
      console.log({ todosFormattedData });

      this.todos = todosFormattedData;
    }
  }

  ngOnInit() {
    this.getTodos();
  }

  storeTodos(todo: Todo) {
    const todosInLocalStorage = localStorage.getItem('todos');

    if (todosInLocalStorage === null) {
      localStorage.setItem('todos', JSON.stringify([todo]));
    } else {
      let todosFormattedData = JSON.parse(todosInLocalStorage) as Todo[];
      todosFormattedData = [...todosFormattedData, todo];
      localStorage.setItem('todos', JSON.stringify(todosFormattedData));
    }
  }

  addTodo() {
    const todoTemp = {
      title: this.todoInput,
      id: Date.now(),
    };
    this.storeTodos(todoTemp);
    this.todos = [...this.todos, todoTemp];
    this.todoInput = '';
  }

  makeTodoDone(id: number) {
    this.todos = this.todos.map((todo) => {
      if (todo.id === id) return { ...todo, done: true };
      return todo;
    });
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }

  deleteTodo(id: number) {
    this.todos = this.todos.filter((todo) => todo.id !== id);
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }

  editTodo(todo: Todo) {
    this.openModal = true;
    this.selectedTodo = todo;
  }

  closeModal() {
    this.openModal = false;
    this.selectedTodo = null;
  }

  saveTodo() {
    if (!this.selectedTodo) return;
    const index = this.todos.findIndex(
      (item) => item.id === this.selectedTodo?.id
    );
    if (index !== -1) {
      this.todos[index] = this.selectedTodo;
      localStorage.setItem('todos', JSON.stringify(this.todos));
      this.closeModal();
    }
  }
}
