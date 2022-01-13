import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Todo } from '../shared/todo';
import { TodoListService } from '../shared/todo-list.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  public todoDescription = '';
  public todoDueDate = formatDate(new Date(), 'yyyy-MM-dd', 'en');
  public showDone = false;

  constructor(public todoListService: TodoListService) { }

  ngOnInit(): void {
  }

  public addTodo(): void {
    if (this.todoDescription && this.todoDueDate) {
      this.todoListService.addTodo(this.todoDescription, new Date(this.todoDueDate));
      this.todoDescription = '';
      this.todoDueDate = formatDate(new Date(), 'yyyy-MMdd', 'en');
    }
  }

}
