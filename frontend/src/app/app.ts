import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Task {
  id?: string;
  title: string;
  description: string;
  status: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {

  tasks: Task[] = [];
  errorMessage = '';
  loading = true;

  constructor(private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    console.log('APP ELINDULT');
    this.loadTasks();
  }

  async loadTasks(): Promise<void> {
    console.log('LOADTASKS ELINDULT');
    this.loading = true;

    try {
      console.log('FETCH ELŐTT');

      const response = await fetch('http://127.0.0.1:5069/api/tasks');

      console.log('FETCH UTÁN', response);

      if (!response.ok) {
        throw new Error(`HTTP hiba: ${response.status}`);
      }

      const text = await response.text();
      console.log('RAW TEXT:', text);

      const data: Task[] = JSON.parse(text);
      console.log('PARSED DATA:', data);

      this.tasks = data;
      this.errorMessage = '';

      // Angular UI frissítés kényszerítése
      this.cd.detectChanges();

    } catch (error) {
      console.error('API HIBA:', error);
      this.errorMessage = 'Nem sikerült betölteni a taskokat.';
    } finally {
      console.log('FINALLY LEFUTOTT');
      this.loading = false;

      this.cd.detectChanges();
    }
  }
}