import {Component, OnInit} from '@angular/core';
import {Task} from '../task';
import {Tasks as TasksService} from '../tasks';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-tasks',
  imports: [
    FormsModule
  ],
  templateUrl: './tasks.html',
  styleUrl: './tasks.css',
})
export class Tasks implements OnInit {
  public tasks: Task[] = [];
  public newTask: Task = {};
  public isProcessing = false;

  constructor(
    private tasksService: TasksService,
  ) {
  }

  ngOnInit(): void {
    this.tasksService.index().subscribe((tasks) => {
      this.tasks = tasks;
    });
    this.isProcessing = false;
  }

  addTask() {
    if (this.newTask.title === undefined) {
      return;
    }

    this.newTask.completed = false;
    this.newTask.archived = false;

    this.tasks.unshift(this.newTask); // optimistic update; try commenting this line off and compare the difference

    this.isProcessing = true;
    this.tasksService.post(this.newTask).subscribe((task) => {
      this.newTask = {};
      this.ngOnInit();
    });
  }
}
