import { Component } from '@angular/core';

type Todo = {
  id: Number;
  title: String;
  done?: Boolean;
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  todoInput = '';
  todos: Todo[] = [];

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
}
