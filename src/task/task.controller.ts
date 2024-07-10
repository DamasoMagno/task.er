import { Controller, Delete, Get, HttpCode, Param, Patch, Post, Req, Res } from '@nestjs/common';
import { z } from "zod"

import { Task, TaskService } from './task.service';

type Params = {
  id: string
}

@Controller("/task")
export class TaskController {
  constructor(private taskService: TaskService) { }

  @Get()
  @HttpCode(200)
  listTasks(): Task[] {
    return this.taskService.listTasks()
  }

  @Get(":id")
  @HttpCode(200)
  getTask(@Param() params: Params): Task {
    const taskId = params.id
    return this.taskService.getTask(taskId)
  }

  @Post()
  @HttpCode(201)
  createTask(@Req() req: Request, @Res() res: Response): void {
    const taskSchema = z.object({
      title: z.string(),
      content: z.string(),
    })

    const { title, content } = taskSchema.parse(req.body)

    this.taskService.createTask({ title, content })
    res.json()
  }

  @Patch(":id")
  @HttpCode(204)
  updateTask(@Param() params: Params, @Req() req: Request, @Res() res: Response): void {
    const taskId = params.id

    const taskSchema = z.object({
      title: z.string().optional(),
      content: z.string().optional(),
    })

    const { title, content } = taskSchema.parse(req.body)

    this.taskService.updateTask({ title, content, taskId })
    res.json()
  }

  @Patch("/finish/:id")
  @HttpCode(204)
  finishTask(@Param() params: Params, @Res() res: Response): void {
    const taskId = params.id
    this.taskService.finishTask(taskId)

    res.json()
  }

  @Delete(":id")
  @HttpCode(200)
  removeTask(@Param() params: Params, @Res() res: Response): void {
    const taskId = params.id
    this.taskService.deleteTask(taskId)

    res.json()
  }
}