export class CreateTodoDto {
  id?: number;
  readonly title: string;
  readonly done: boolean;
  readonly description?: string;
}
