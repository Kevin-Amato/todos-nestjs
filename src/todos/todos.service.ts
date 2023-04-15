import { Injectable, NotFoundException } from '@nestjs/common';
import { Todo } from './interfaces/todo.interface';
import { CreateTodoDto } from './dto/create-todo.dto';

@Injectable()
export class TodosService {
  todos: Todo[] = [
    {
      id: 1,
      title: 'todos app',
      description: 'create NestJS todos app',
      done: false,
    },
    {
      id: 2,
      title: 'Bread',
      description: 'Acheter du pain',
      done: true,
    },
  ];

  findAll(): Todo[] {
    return this.todos;
  }

  create(todo: CreateTodoDto) {
    todo.id = Math.max(...this.todos.map((todo) => todo.id)) + 1;

    this.todos = [...this.todos, todo];
  }

  findOne(id: string) {
    const todo: Todo = this.todos.find((todo) => todo.id === Number(id));

    if (!todo) return new NotFoundException("Cette todo n'existe pas");

    return todo;
  }

  update(id: string, todo: Todo) {
    const todoToUpdate: Todo = this.todos.find((todo) => todo.id === +id);

    if (!todoToUpdate) return new NotFoundException("Cette todo n'existe pas");
    if (todo.title) todoToUpdate.title = todo.title;
    if (todo.description) todoToUpdate.description = todo.description;
    if (todo.hasOwnProperty('done')) todoToUpdate.done = todo.done;

    const updatedTodos: Todo[] = this.todos.map((todo) =>
      todo.id !== +id ? todo : (todo = todoToUpdate),
    );
    this.todos = [...updatedTodos];

    return { updatedTodo: 1, todo: todoToUpdate };
  }

  delete(id: string) {
    const index: number = this.todos.findIndex((todo) => todo.id === +id);

    if (!this.todos[index]) {
      return new NotFoundException("Cette todo n'existe pas");
    }

    this.todos.splice(index, 1);

    return { deletedTodo: 1 };
  }
}
