import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { Todo } from './interfaces/todo.interface';
import { CreateTodoDto } from './dto/create-todo.dto';

@Controller('todos')
export class TodosController {
  constructor(private readonly todoService: TodosService) {}
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.todoService.findOne(id);
  }

  @Get()
  findAll(): Todo[] {
    return this.todoService.findAll();
  }

  @Post()
  createTodo(@Body() newTodo: CreateTodoDto) {
    return this.todoService.create(newTodo);
  }

  @Patch(':id')
  updateTodo(@Param('id') id: string, @Body() updateTodo: CreateTodoDto) {
    return this.todoService.update(id, updateTodo);
  }

  @Delete(':id')
  removeTodo(@Param('id') id: string) {
    return this.todoService.delete(id);
  }
}
