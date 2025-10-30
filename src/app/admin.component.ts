import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { FirebaseService } from './firebase.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="min-h-screen bg-gray-900 p-8">
      <div class="max-w-4xl mx-auto">
        <div class="flex justify-between items-center mb-8">
          <h1 class="text-2xl font-bold text-white">Admin Panel</h1>
          <div class="flex gap-2">
            <button (click)="showPasswordModal = true" class="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-500">Change Credentials</button>
            <button (click)="goHome()" class="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600">Back to Site</button>
            <button (click)="logout()" class="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-500">Logout</button>
          </div>
        </div>

        <div class="bg-gray-800 rounded-lg p-6 mb-6">
          <h2 class="text-xl text-white mb-4">Profile Settings</h2>
          <div class="space-y-4">
            <div>
              <label class="block text-gray-300 text-sm mb-2">Name</label>
              <input [(ngModel)]="profile.name" class="w-full bg-gray-700 text-white px-4 py-2 rounded border border-gray-600">
            </div>
            <div>
              <label class="block text-gray-300 text-sm mb-2">Username</label>
              <input [(ngModel)]="profile.username" class="w-full bg-gray-700 text-white px-4 py-2 rounded border border-gray-600">
            </div>
            <div>
              <label class="block text-gray-300 text-sm mb-2">Bio</label>
              <input [(ngModel)]="profile.bio" class="w-full bg-gray-700 text-white px-4 py-2 rounded border border-gray-600">
            </div>
            <div>
              <label class="block text-gray-300 text-sm mb-2">Description</label>
              <textarea [(ngModel)]="profile.description" class="w-full bg-gray-700 text-white px-4 py-2 rounded border border-gray-600" rows="2"></textarea>
            </div>
            <div>
              <label class="block text-gray-300 text-sm mb-2">Email</label>
              <input [(ngModel)]="profile.email" type="email" class="w-full bg-gray-700 text-white px-4 py-2 rounded border border-gray-600">
            </div>
            <div>
              <label class="block text-gray-300 text-sm mb-2">GitHub URL</label>
              <input [(ngModel)]="profile.github" class="w-full bg-gray-700 text-white px-4 py-2 rounded border border-gray-600">
            </div>
            <div>
              <label class="block text-gray-300 text-sm mb-2">LinkedIn URL</label>
              <input [(ngModel)]="profile.linkedin" class="w-full bg-gray-700 text-white px-4 py-2 rounded border border-gray-600">
            </div>
            <div>
              <label class="block text-gray-300 text-sm mb-2">Twitter URL</label>
              <input [(ngModel)]="profile.twitter" class="w-full bg-gray-700 text-white px-4 py-2 rounded border border-gray-600">
            </div>
            <div>
              <label class="block text-gray-300 text-sm mb-2">Avatar</label>
              <div class="flex gap-4 items-center">
                <img [src]="profile.avatar" class="w-20 h-20 rounded-full border border-gray-600">
                <div class="flex-1">
                  <input type="file" (change)="onFileSelect($event)" accept="image/*" class="hidden" #fileInput>
                  <button (click)="fileInput.click()" class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500 mb-2">Upload Image</button>
                  <input [(ngModel)]="profile.avatar" placeholder="Or paste URL" class="w-full bg-gray-700 text-white px-4 py-2 rounded border border-gray-600 text-sm">
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-gray-800 rounded-lg p-6 mb-6">
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-xl text-white">Skills</h2>
            <button (click)="addSkill()" class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500">Add Skill</button>
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div *ngFor="let skill of skills; let i = index" class="bg-gray-700 rounded p-3 flex items-center gap-3">
              <input [(ngModel)]="skill.icon" placeholder="Icon" class="w-16 bg-gray-600 text-white px-2 py-1 rounded text-sm">
              <input [(ngModel)]="skill.name" placeholder="Skill Name" class="flex-1 bg-gray-600 text-white px-2 py-1 rounded text-sm">
              <button (click)="removeSkill(i)" class="text-red-400 hover:text-red-300">×</button>
            </div>
          </div>
        </div>

        <div class="bg-gray-800 rounded-lg p-6">
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-xl text-white">Projects</h2>
            <button (click)="addProject()" class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500">Add Project</button>
          </div>
          
          <div *ngFor="let project of projects; let i = index" class="bg-gray-700 rounded p-4 mb-4">
            <div class="space-y-3">
              <input [(ngModel)]="project.name" placeholder="Project Name" class="w-full bg-gray-600 text-white px-3 py-2 rounded text-sm">
              <input [(ngModel)]="project.description" placeholder="Description" class="w-full bg-gray-600 text-white px-3 py-2 rounded text-sm">
              <textarea [(ngModel)]="project.summary" placeholder="Summary (detailed description)" class="w-full bg-gray-600 text-white px-3 py-2 rounded text-sm" rows="2"></textarea>
              <input [(ngModel)]="project.technologies" placeholder="Technologies (comma separated)" class="w-full bg-gray-600 text-white px-3 py-2 rounded text-sm">
              <input [(ngModel)]="project.image" placeholder="Project Image URL" class="w-full bg-gray-600 text-white px-3 py-2 rounded text-sm">
              <input [(ngModel)]="project.link" placeholder="Demo/Live Link" class="w-full bg-gray-600 text-white px-3 py-2 rounded text-sm">
              <div class="grid grid-cols-3 gap-3">
                <input [(ngModel)]="project.language" placeholder="Language" class="bg-gray-600 text-white px-3 py-2 rounded text-sm">
                <input [(ngModel)]="project.stars" type="number" placeholder="Stars" class="bg-gray-600 text-white px-3 py-2 rounded text-sm">
                <select [(ngModel)]="project.color" class="bg-gray-600 text-white px-3 py-2 rounded text-sm">
                  <option value="bg-yellow-400">Yellow</option>
                  <option value="bg-blue-500">Blue</option>
                  <option value="bg-cyan-400">Cyan</option>
                  <option value="bg-sky-500">Sky</option>
                  <option value="bg-green-500">Green</option>
                  <option value="bg-red-500">Red</option>
                  <option value="bg-purple-500">Purple</option>
                  <option value="bg-pink-500">Pink</option>
                </select>
              </div>
              <div>
                <label class="block text-gray-400 text-xs mb-1">Features (one per line)</label>
                <textarea [(ngModel)]="featuresText[i]" (ngModelChange)="updateFeatures(i)" placeholder="Feature 1&#10;Feature 2&#10;Feature 3" class="w-full bg-gray-600 text-white px-3 py-2 rounded text-sm" rows="3"></textarea>
              </div>
              <button (click)="removeProject(i)" class="text-red-400 text-sm hover:text-red-300">Delete</button>
            </div>
          </div>
        </div>

        <button (click)="save()" class="w-full mt-6 px-6 py-3 bg-green-600 text-white rounded hover:bg-green-500 font-semibold">Save Changes</button>
      </div>
    </div>

    <div *ngIf="showPasswordModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/90" (click)="showPasswordModal = false">
      <div class="bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4" (click)="$event.stopPropagation()">
        <h2 class="text-xl font-bold text-white mb-4">Change Credentials</h2>
        <input [(ngModel)]="newUsername" type="text" placeholder="New Username" class="w-full bg-gray-700 text-white px-4 py-2 rounded border border-gray-600 mb-4">
        <input [(ngModel)]="newPassword" type="password" placeholder="New Password (min 6 chars)" class="w-full bg-gray-700 text-white px-4 py-2 rounded border border-gray-600 mb-4">
        <div class="flex gap-2">
          <button (click)="changeCredentials()" class="flex-1 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500">Save</button>
          <button (click)="showPasswordModal = false; newUsername = ''; newPassword = ''" class="flex-1 px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600">Cancel</button>
        </div>
      </div>
    </div>
  `
})
export class AdminComponent {
  profile = {
    name: 'Your Name',
    username: 'YourName',
    bio: 'Full Stack Developer',
    description: 'Passionate developer creating innovative solutions',
    avatar: 'https://via.placeholder.com/260',
    email: 'your@email.com',
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    twitter: 'https://twitter.com'
  };

  skills = [
    { name: 'JavaScript', icon: '⚡' },
    { name: 'TypeScript', icon: '📘' },
    { name: 'Angular', icon: '🅰️' },
    { name: 'React', icon: '⚛️' }
  ];

  projects: any[] = [
    { name: 'E-Commerce Platform', description: 'Full-stack e-commerce solution', language: 'TypeScript', stars: 42, visibility: 'Public', color: 'bg-blue-500', summary: '', technologies: '', features: [], image: '', link: '' },
    { name: 'AI Chat Application', description: 'Real-time chat with AI', language: 'Python', stars: 28, visibility: 'Public', color: 'bg-green-500', summary: '', technologies: '', features: [], image: '', link: '' }
  ];
  featuresText: string[] = [];

  showPasswordModal = false;
  newUsername = '';
  newPassword = '';

  constructor(private router: Router, private firebase: FirebaseService) {
    if (!sessionStorage.getItem('adminAuth')) {
      this.router.navigate(['/login']);
      return;
    }
    this.loadData();
  }

  async loadData() {
    const firebaseData = await this.firebase.getPortfolioData();
    if (firebaseData) {
      this.profile = firebaseData['profile'];
      this.projects = firebaseData['projects'];
      if (firebaseData['skills']) this.skills = firebaseData['skills'];
    } else {
      const saved = localStorage.getItem('portfolioData');
      if (saved) {
        const data = JSON.parse(saved);
        this.profile = data.profile;
        this.projects = data.projects;
        if (data.skills) this.skills = data.skills;
      }
    }
    this.projects.forEach((p, i) => {
      this.featuresText[i] = p.features ? p.features.join('\n') : '';
    });
  }

  updateFeatures(index: number) {
    this.projects[index].features = this.featuresText[index].split('\n').filter((f: string) => f.trim());
  }

  addProject() {
    this.projects.push({ name: '', description: '', language: '', stars: 0, visibility: 'Public', color: 'bg-blue-500', summary: '', technologies: '', features: [], image: '', link: '' });
    this.featuresText.push('');
  }

  removeProject(index: number) {
    this.projects.splice(index, 1);
    this.featuresText.splice(index, 1);
  }

  onFileSelect(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.profile.avatar = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  addSkill() {
    this.skills.push({ name: '', icon: '💡' });
  }

  removeSkill(index: number) {
    this.skills.splice(index, 1);
  }

  async save() {
    const data = { profile: this.profile, projects: this.projects, skills: this.skills };
    const success = await this.firebase.savePortfolioData(data);
    if (success) {
      localStorage.setItem('portfolioData', JSON.stringify(data));
      alert('Changes saved to Firebase!');
    } else {
      alert('Error saving to Firebase. Check console.');
    }
  }

  goHome() {
    this.router.navigate(['/']);
  }

  logout() {
    sessionStorage.removeItem('adminAuth');
    this.router.navigate(['/login']);
  }

  changeCredentials() {
    if (this.newUsername && this.newPassword.length >= 6) {
      localStorage.setItem('adminUsername', this.newUsername);
      localStorage.setItem('adminPassword', this.newPassword);
      this.showPasswordModal = false;
      this.newUsername = '';
      this.newPassword = '';
      alert('Credentials changed successfully! Please login again.');
      this.logout();
    } else {
      alert('Username required and password must be at least 6 characters');
    }
  }
}
