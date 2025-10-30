import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      <div class="bg-gray-800 rounded-lg p-8 max-w-md w-full border border-gray-700">
        <h1 class="text-3xl font-bold text-white mb-6 text-center">Admin Login</h1>
        <form (ngSubmit)="login()">
          <div class="mb-4">
            <label class="block text-gray-300 text-sm mb-2">Username</label>
            <input [(ngModel)]="username" name="username" type="text" class="w-full bg-gray-700 text-white px-4 py-2 rounded border border-gray-600 focus:outline-none focus:border-blue-500" required>
          </div>
          <div class="mb-4">
            <label class="block text-gray-300 text-sm mb-2">Password</label>
            <input [(ngModel)]="password" name="password" type="password" class="w-full bg-gray-700 text-white px-4 py-2 rounded border border-gray-600 focus:outline-none focus:border-blue-500" required>
          </div>
          <p *ngIf="error" class="text-red-400 text-sm mb-4">{{ error }}</p>
          <button type="submit" class="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition font-semibold">
            Login
          </button>
        </form>
      </div>
    </div>
  `
})
export class LoginComponent {
  username = '';
  password = '';
  error = '';

  constructor(private router: Router) {}

  login() {
    const adminUsername = localStorage.getItem('adminUsername') || 'admin';
    const adminPassword = localStorage.getItem('adminPassword') || 'admin123';
    
    if (this.username === adminUsername && this.password === adminPassword) {
      sessionStorage.setItem('adminAuth', 'true');
      this.router.navigate(['/admin']);
    } else {
      this.error = 'Incorrect username or password';
    }
  }
}
