import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { FirebaseService } from './firebase.service';

interface Project {
  name: string;
  description: string;
  language: string;
  stars: number;
  visibility: string;
  color: string;
  summary?: string;
  technologies?: string;
  features?: string[];
  image?: string;
  link?: string;
}

interface Skill {
  name: string;
  icon: string;
}

import { ChatComponent } from './chat.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ChatComponent],
  templateUrl: './app.component.html'
})
export class AppComponent {
  profile = { name: 'Your Name', username: 'YourName', bio: 'Full Stack Developer', description: 'Passionate developer creating innovative solutions', avatar: 'https://via.placeholder.com/260', email: 'your@email.com', github: 'https://github.com', linkedin: 'https://linkedin.com', twitter: 'https://twitter.com' };
  displayName = '';
  displayBio = '';
  displaySkillsTitle = '';
  displayProjectsTitle = '';
  displayContactTitle = '';
  skillsTyped = false;
  projectsTyped = false;
  contactTyped = false;
  showImageModal = false;
  mobileMenuOpen = false;
  showProjectModal = false;
  selectedProject: any = null;
  
  skills = [
    { name: 'JavaScript', icon: '⚡' },
    { name: 'TypeScript', icon: '📘' },
    { name: 'Angular', icon: '🅰️' },
    { name: 'React', icon: '⚛️' },
    { name: 'Node.js', icon: '🟢' },
    { name: 'Python', icon: '🐍' },
    { name: 'Docker', icon: '🐳' },
    { name: 'AWS', icon: '☁️' }
  ];

  projects: Project[] = [
    { name: 'E-Commerce Platform', description: 'Full-stack e-commerce solution with payment integration and admin dashboard', language: 'TypeScript', stars: 42, visibility: 'Public', color: 'bg-blue-500', summary: 'A comprehensive e-commerce platform built with modern technologies, featuring secure payment processing, inventory management, and a powerful admin dashboard.', technologies: 'Angular, Node.js, MongoDB, Stripe', features: ['Payment Integration', 'Admin Dashboard', 'Inventory Management', 'User Authentication'], image: 'https://via.placeholder.com/800x400/3b82f6/ffffff?text=E-Commerce+Platform', link: 'https://example.com/demo' },
    { name: 'AI Chat Application', description: 'Real-time chat app with AI-powered responses and sentiment analysis', language: 'Python', stars: 28, visibility: 'Public', color: 'bg-green-500', summary: 'An intelligent chat application that uses AI to provide smart responses and analyze user sentiment in real-time.', technologies: 'Python, TensorFlow, WebSocket, React', features: ['AI-Powered Responses', 'Sentiment Analysis', 'Real-time Messaging', 'User Profiles'], image: 'https://via.placeholder.com/800x400/22c55e/ffffff?text=AI+Chat+App' },
    { name: 'Task Management', description: 'Collaborative project management tool with real-time updates', language: 'React', stars: 35, visibility: 'Public', color: 'bg-cyan-400', summary: 'A collaborative task management system designed for teams to organize, track, and complete projects efficiently.', technologies: 'React, Firebase, Material-UI', features: ['Real-time Collaboration', 'Task Tracking', 'Team Management', 'Progress Reports'], image: 'https://via.placeholder.com/800x400/22d3ee/ffffff?text=Task+Manager' },
    { name: 'API Gateway', description: 'Microservices API gateway with authentication and rate limiting', language: 'Go', stars: 18, visibility: 'Public', color: 'bg-sky-500', summary: 'A high-performance API gateway for microservices architecture with built-in security and rate limiting.', technologies: 'Go, Redis, Docker', features: ['Authentication', 'Rate Limiting', 'Load Balancing', 'API Monitoring'], image: 'https://via.placeholder.com/800x400/0ea5e9/ffffff?text=API+Gateway' },
    { name: 'Mobile App', description: 'Cross-platform mobile application for fitness tracking', language: 'React Native', stars: 22, visibility: 'Public', color: 'bg-purple-500', summary: 'A cross-platform fitness tracking app that helps users monitor their workouts, nutrition, and health goals.', technologies: 'React Native, Redux, Firebase', features: ['Workout Tracking', 'Nutrition Logging', 'Progress Charts', 'Social Sharing'], image: 'https://via.placeholder.com/800x400/a855f7/ffffff?text=Fitness+App' },
    { name: 'DevOps Pipeline', description: 'Automated CI/CD pipeline with Docker and Kubernetes', language: 'Shell', stars: 15, visibility: 'Public', color: 'bg-gray-500', summary: 'An automated CI/CD pipeline solution for seamless deployment and scaling of containerized applications.', technologies: 'Docker, Kubernetes, Jenkins, AWS', features: ['Automated Testing', 'Container Orchestration', 'Auto Scaling', 'Monitoring'], image: 'https://via.placeholder.com/800x400/6b7280/ffffff?text=DevOps+Pipeline' }
  ];

  constructor(private meta: Meta, private title: Title, private router: Router, private firebase: FirebaseService) {
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
    this.title.setTitle(this.profile.name + ' - Professional Portfolio');
    this.meta.addTags([
      { name: 'description', content: this.profile.description },
      { name: 'robots', content: 'index, follow' }
    ]);
    this.typeWriter();
  }

  typeWriter() {
    this.typeText(this.profile.name, 'displayName', 500);
    this.typeText(this.profile.bio, 'displayBio', 500 + this.profile.name.length * 100);
  }

  @HostListener('window:scroll', [])
  onScroll() {
    const skillsSection = document.getElementById('skills');
    const projectsSection = document.getElementById('projects');
    const contactSection = document.getElementById('contact');

    if (skillsSection && !this.skillsTyped && this.isInViewport(skillsSection)) {
      this.skillsTyped = true;
      this.typeText('Skills & Technologies', 'displaySkillsTitle', 0);
    }

    if (projectsSection && !this.projectsTyped && this.isInViewport(projectsSection)) {
      this.projectsTyped = true;
      this.typeText('Featured Projects', 'displayProjectsTitle', 0);
    }

    if (contactSection && !this.contactTyped && this.isInViewport(contactSection)) {
      this.contactTyped = true;
      this.typeText("Let's Work Together", 'displayContactTitle', 0);
    }
  }

  isInViewport(element: HTMLElement): boolean {
    const rect = element.getBoundingClientRect();
    return rect.top <= window.innerHeight * 0.75;
  }

  openImage() {
    this.showImageModal = true;
  }

  closeImage() {
    this.showImageModal = false;
  }

  openProject(project: any) {
    this.selectedProject = project;
    this.showProjectModal = true;
  }

  closeProjectModal() {
    this.showProjectModal = false;
  }

  viewFullDetails() {
    const index = this.projects.indexOf(this.selectedProject);
    this.showProjectModal = false;
    this.router.navigate(['/project', index]);
  }

  typeText(text: string, property: string, delay: number) {
    let i = 0;
    const speed = 80;
    const type = () => {
      if (i < text.length) {
        (this as any)[property] += text.charAt(i);
        i++;
        setTimeout(type, speed);
      }
    };
    setTimeout(type, delay);
  }
}
