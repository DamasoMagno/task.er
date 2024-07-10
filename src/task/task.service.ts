import { Injectable, NotFoundException } from "@nestjs/common";
import { randomUUID } from "crypto";

export type Task = {
  id: string
  title: string
  content: string
  finished: boolean
  created_at: Date
}

type CreateTask = {
  title: string
  content: string
}

type UpdateTask = {
  taskId: string
  title?: string
  content?: string
}

@Injectable()
export class TaskService {
  tasks: Task[] = [
    {
      id: randomUUID(),
      title: "Lorem ipsum dolor sit amet",
      content: "Lorem ipsum dolor sit amet",
      finished: false,
      created_at: new Date()
    }
  ]

  listTasks(): Task[] {
    return this.tasks
  }

  getTask(taskId: string): Task {
    const task = this.tasks.find(task => task.id === taskId)

    if (!task) {
      throw new NotFoundException("Tarefa não encontrada")
    }

    return task
  }

  createTask({ title, content }: CreateTask): void {
    const task: Task = {
      id: randomUUID(),
      title,
      content,
      created_at: new Date,
      finished: false
    }

    this.tasks.push(task)
  }

  updateTask({ title, content, taskId }: UpdateTask): void {
    this.tasks = this.tasks.map(task => {
      return task.id === taskId ? {
        ...task,
        title: title ? title : task.title,
        content: content ? content : task.content
      } : task
    })
  }

  finishTask(taskId: string): void {
    this.tasks = this.tasks.map(task => {
      return task.id === taskId ? {
        ...task,
        finished: true
      } : task
    })
  }

  deleteTask(taskId: string): void {
    this.tasks = this.tasks.filter(task => task.id !== taskId);
  }
}