import {Component, OnInit} from '@angular/core';
import {Task} from '../task';
import {Tasks as TasksService} from '../tasks';

@Component({
  selector: 'app-tasks',
  imports: [],
  templateUrl: './tasks.html',
  styleUrl: './tasks.css',
})
export class Tasks implements OnInit {
  tasks: Task[] = [];
  newTask: Task = {};

  constructor(
    private tasksService: TasksService,
  ) {
  }

  ngOnInit(): void {
    this.tasksService.index().subscribe((tasks) => {
      this.tasks = tasks;
    });
  }
}
