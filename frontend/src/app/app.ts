import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Task {
  id?: string;
  title: string;
  description: string;
  status: string;
  editStatus?: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {

  tasks: Task[] = [];
  errorMessage = '';
  loading = true;

  newTask: Task = {
    title: '',
    description: '',
    status: 'Todo'
  };

  constructor(private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  async loadTasks(): Promise<void> {
    this.loading = true;

    try {

      const response = await fetch('/api/tasks');

      if (!response.ok) {
        throw new Error(`HTTP hiba: ${response.status}`);
      }

      const data: Task[] = await response.json();

      this.tasks = data.map(task => ({
        ...task,
        editStatus: task.status
      }));

      this.errorMessage = '';

    } catch (error) {

      console.error('API HIBA:', error);
      this.errorMessage = 'Nem sikerült betölteni a taskokat.';

    } finally {

      this.loading = false;
      this.cd.detectChanges();

    }
  }

  async addTask(): Promise<void> {

    if (!this.newTask.title.trim() || !this.newTask.description.trim()) {
      alert('A title és a description kötelező.');
      return;
    }

    try {

      const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: this.newTask.title,
          description: this.newTask.description,
          status: this.newTask.status
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP hiba: ${response.status}`);
      }

      this.newTask = {
        title: '',
        description: '',
        status: 'Todo'
      };

      await this.loadTasks();

    } catch (error) {

      console.error('Mentési hiba:', error);
      alert('Nem sikerült létrehozni a taskot.');

    }
  }

  async updateStatus(task: Task): Promise<void> {

    if (!task.id) return;

    try {

      const updatedTask = {
        id: task.id,
        title: task.title,
        description: task.description,
        status: task.editStatus ?? task.status
      };

      const response = await fetch(`/api/tasks/${task.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedTask)
      });

      if (!response.ok) {
        throw new Error(`HTTP hiba: ${response.status}`);
      }

      await this.loadTasks();

    } catch (error) {

      console.error('Status update hiba:', error);
      alert('Nem sikerült frissíteni a státuszt.');

    }
  }

  async deleteTask(id?: string): Promise<void> {

    if (!id) {
      alert('Ehhez a taskhoz nincs ID.');
      return;
    }

    const confirmed = confirm('Biztosan törölni szeretnéd ezt a taskot?');
    if (!confirmed) return;

    try {

      const response = await fetch(`/api/tasks/${id}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error(`HTTP hiba: ${response.status}`);
      }

      await this.loadTasks();

    } catch (error) {

      console.error('Törlési hiba:', error);
      alert('Nem sikerült törölni a taskot.');

    }
  }
}