import { Injectable } from '@angular/core';
import { Todo } from './todo';

@Injectable({
  providedIn: 'root'
})
export class TodoListService {
  public todos: Todo[] = [];

  constructor() { }

  public getTodos(done?: boolean): Todo[] {
    return this.todos
      .filter(t => done === undefined || (done && t.doneDate) || (!done && !t.doneDate))
      .sort((a, b) => a.dueDate.getTime() - b.dueDate.getTime());
  }

  public addTodo(description: string, dueDate: Date): void {
    let newId = 0;

    if (this.todos.length) {
      newId = Math.max(...this.todos.map(t => t.id)) + 1;
    }

    this.todos.push({ id: newId, description: description, dueDate: dueDate });
  }

  public deleteTodoById(id: number): void {
    const index = this.todos.findIndex(t => t.id === id);

    if (index >= 0) {
      this.todos.splice(index, 1);
    }
  }

  public updateTodoById(id: number, description: string, dueDate: Date): void {
    const index = this.todos.findIndex(t => t.id === id);

    if (index >= 0) {
      this.todos[index].description = description;
      this.todos[index].dueDate = dueDate;
    }
  }

  public toggleDoneStateById(id: number): void {
    const index = this.todos.findIndex(t => t.id === id);

    if (index >= 0) {
      if (this.todos[index].doneDate) {
        this.todos[index].doneDate = undefined;
      } else {
        this.todos[index].doneDate = new Date();
      }
    }
  }
}
