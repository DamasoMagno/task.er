import { Injectable } from "@nestjs/common";
import { randomUUID } from "crypto";

export type Task = {
  id: string
  title: string
  content: string
}

@Injectable()
export class TaskService {
  tasks: Task[] = []

  listTasks(): Task[] {
    return this.tasks
  }

  createTask({ title, content }: { title: string; content: string }): void {
    const task: Task = {
      id: randomUUID(),
      title,
      content
    }

    this.tasks.push(task)
  }

  delete(taskId: string): void {
    const findTaskById = this.tasks.filter(task => task.id !== taskId);
    this.tasks = [...findTaskById]
  }
}