import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FirebaseService } from './firebase.service';

@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="min-h-screen">
      <header class="bg-gray-900 border-b border-gray-800 sticky top-0 z-50 backdrop-blur-sm bg-opacity-90">
        <nav class="max-w-6xl mx-auto px-6 py-4">
          <button (click)="goBack()" class="text-white hover:text-blue-400 transition">
            <i class="fas fa-arrow-left mr-2"></i>Back to Portfolio
          </button>
        </nav>
      </header>

      <main class="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12" *ngIf="project">
        <div class="mb-8">
          <div class="flex flex-col sm:flex-row justify-between items-start gap-4 mb-4">
            <h1 class="text-3xl sm:text-4xl md:text-5xl font-black text-white">{{ project.name }}</h1>
            <a *ngIf="project.link" [href]="project.link" target="_blank" class="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-500 hover:to-purple-500 transition font-semibold flex items-center gap-2 whitespace-nowrap">
              <i class="fas fa-external-link-alt"></i> View Demo
            </a>
          </div>
          <p class="text-base sm:text-lg md:text-xl text-gray-300">{{ project.description }}</p>
        </div>

        <div *ngIf="project.image" class="mb-12 relative group">
          <img [src]="project.image" alt="Project" class="w-full rounded-lg shadow-2xl transition group-hover:scale-[1.02]">
          <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition"></div>
        </div>

        <div class="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
          <div class="bg-gradient-to-br from-blue-900/30 to-blue-800/20 backdrop-blur-sm p-6 rounded-lg border border-blue-700/50 hover:border-blue-500 transition">
            <div class="flex items-center gap-3 mb-2">
              <i class="fas fa-code text-blue-400 text-2xl"></i>
              <h3 class="text-blue-400 font-semibold">Language</h3>
            </div>
            <p class="text-white text-lg">{{ project.language }}</p>
          </div>
          <div class="bg-gradient-to-br from-yellow-900/30 to-yellow-800/20 backdrop-blur-sm p-6 rounded-lg border border-yellow-700/50 hover:border-yellow-500 transition">
            <div class="flex items-center gap-3 mb-2">
              <i class="fas fa-star text-yellow-400 text-2xl"></i>
              <h3 class="text-yellow-400 font-semibold">Stars</h3>
            </div>
            <p class="text-white text-lg">{{ project.stars }}</p>
          </div>
          <div class="bg-gradient-to-br from-green-900/30 to-green-800/20 backdrop-blur-sm p-6 rounded-lg border border-green-700/50 hover:border-green-500 transition">
            <div class="flex items-center gap-3 mb-2">
              <i class="fas fa-check-circle text-green-400 text-2xl"></i>
              <h3 class="text-green-400 font-semibold">Status</h3>
            </div>
            <p class="text-white text-lg">{{ project.visibility }}</p>
          </div>
        </div>

        <div class="grid md:grid-cols-2 gap-6 sm:gap-8 mb-6 sm:mb-8">
          <div class="bg-gray-800/70 backdrop-blur-sm p-8 rounded-lg border border-gray-700 hover:border-blue-500 transition">
            <div class="flex items-center gap-3 mb-4">
              <i class="fas fa-info-circle text-blue-400 text-2xl"></i>
              <h2 class="text-3xl font-bold text-white">Summary</h2>
            </div>
            <p class="text-gray-300 text-lg leading-relaxed">{{ project.summary || project.description }}</p>
          </div>

          <div *ngIf="project.technologies" class="bg-gray-800/70 backdrop-blur-sm p-8 rounded-lg border border-gray-700 hover:border-purple-500 transition">
            <div class="flex items-center gap-3 mb-4">
              <i class="fas fa-layer-group text-purple-400 text-2xl"></i>
              <h2 class="text-3xl font-bold text-white">Technologies</h2>
            </div>
            <div class="flex flex-wrap gap-2">
              <span *ngFor="let tech of project.technologies.split(', ')" class="px-4 py-2 bg-purple-900/30 border border-purple-700/50 rounded-full text-purple-300 text-sm">
                {{ tech }}
              </span>
            </div>
          </div>
        </div>

        <div *ngIf="project.features" class="bg-gradient-to-br from-gray-800/70 to-gray-900/70 backdrop-blur-sm p-8 rounded-lg border border-gray-700 hover:border-green-500 transition">
          <div class="flex items-center gap-3 mb-6">
            <i class="fas fa-list-check text-green-400 text-2xl"></i>
            <h2 class="text-3xl font-bold text-white">Key Features</h2>
          </div>
          <div class="grid md:grid-cols-2 gap-4">
            <div *ngFor="let feature of project.features" class="flex items-start gap-3 bg-gray-900/50 p-4 rounded-lg">
              <i class="fas fa-check text-green-400 mt-1"></i>
              <span class="text-gray-300 text-lg">{{ feature }}</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  `
})
export class ProjectDetailComponent implements OnInit {
  project: any;

  constructor(private route: ActivatedRoute, private router: Router, private firebase: FirebaseService) {}

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    const firebaseData = await this.firebase.getPortfolioData();
    if (firebaseData) {
      this.project = firebaseData['projects'][Number(id)];
    } else {
      const saved = localStorage.getItem('portfolioData');
      if (saved) {
        const data = JSON.parse(saved);
        this.project = data.projects[Number(id)];
      }
    }
  }

  goBack() {
    this.router.navigate(['/']);
  }
}
