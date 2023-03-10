import { Component } from '@angular/core';
import Auth from 'src/Services/Auth';

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
  isUserLogIn: boolean = false;
  //instance
  authService: Auth = new Auth();
  username: string = '';
  password: string = '';
  apiResult: string = '';
  oldPassword: string = '';

  getTodos() {
    const todosInLocalStorage = localStorage.getItem('todos');
    if (todosInLocalStorage) {
      const todosFormattedData = JSON.parse(todosInLocalStorage);

      this.todos = todosFormattedData;
    }
  }
  async changePassword(
    username: string,
    password: string,
    oldPassword: string
  ) {
    const res = await this.authService.changePassword(
      username,
      password,
      oldPassword
    );
    console.log(res);
  }

  async register(username: string, password: string) {
    const response = await this.authService.register(username, password);

    this.apiResult = JSON.stringify(response.success);
  }

  async login(username: string, password: string) {
    await this.authService.login(username, password);
    this.isUserLogIn = this.authService.checkUserIsLoggedIn();
  }

  async logout() {
    const response = await this.authService.logout();
    if (response?.success) {
      this.isUserLogIn = this.authService.checkUserIsLoggedIn();
    }
  }

  async ngOnInit() {
    this.getTodos();
    this.isUserLogIn = this.authService.checkUserIsLoggedIn();
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
