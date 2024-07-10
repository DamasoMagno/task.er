import { Controller, Get, Post, Req, Res } from '@nestjs/common';
import { z } from "zod"

import { Task, TaskService } from './task.service';

@Controller()
export class TaskController {
  constructor(private taskService: TaskService) { }

  @Get("/task")
  listTasks(): Task[] {
    return this.taskService.listTasks()
  }

  @Post("/task")
  createTask(@Req() req: Request, @Res() res: Response): void {
    const taskSchema = z.object({
      title: z.string(),
      content: z.string(),
    })

    const { title, content } = taskSchema.parse(req.body)

    this.taskService.createTask({ title, content })
    res.json()
  }
}