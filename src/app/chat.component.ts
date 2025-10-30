import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50">
      <button *ngIf="!isOpen" (click)="toggleChat()" class="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full shadow-2xl hover:scale-110 transition flex items-center justify-center text-white text-xl sm:text-2xl">
        <i class="fas fa-robot"></i>
      </button>

      <div *ngIf="isOpen" class="bg-gray-800 rounded-lg shadow-2xl w-[calc(100vw-2rem)] sm:w-96 h-[500px] max-h-[80vh] flex flex-col border border-gray-700">
        <div class="bg-gradient-to-r from-blue-600 to-purple-600 p-4 rounded-t-lg flex justify-between items-center">
          <div class="flex items-center gap-2">
            <i class="fas fa-robot text-white text-xl"></i>
            <h3 class="text-white font-bold">AI Assistant</h3>
          </div>
          <button (click)="toggleChat()" class="text-white hover:text-gray-200">
            <i class="fas fa-times"></i>
          </button>
        </div>

        <div class="flex-1 overflow-y-auto p-4 space-y-4" #chatContainer>
          <div *ngFor="let msg of messages" [ngClass]="msg.role === 'user' ? 'flex justify-end' : 'flex justify-start'">
            <div [ngClass]="msg.role === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-200'" class="max-w-[80%] rounded-lg p-3">
              <p class="text-sm">{{ msg.content }}</p>
            </div>
          </div>
          <div *ngIf="isTyping" class="flex justify-start">
            <div class="bg-gray-700 text-gray-200 rounded-lg p-3">
              <p class="text-sm">Typing...</p>
            </div>
          </div>
        </div>

        <div class="p-4 border-t border-gray-700">
          <div class="flex gap-2">
            <input [(ngModel)]="userInput" (keyup.enter)="sendMessage()" placeholder="Ask me anything..." class="flex-1 bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:outline-none focus:border-blue-500">
            <button (click)="sendMessage()" class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition">
              <i class="fas fa-paper-plane"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  `
})
export class ChatComponent {
  isOpen = false;
  userInput = '';
  isTyping = false;
  messages: { role: string; content: string }[] = [
    { role: 'assistant', content: 'Hi! I\'m your AI assistant. Ask me about projects, skills, or anything else!' }
  ];

  toggleChat() {
    this.isOpen = !this.isOpen;
  }

  async sendMessage() {
    if (!this.userInput.trim()) return;

    this.messages.push({ role: 'user', content: this.userInput });
    const question = this.userInput;
    this.userInput = '';
    this.isTyping = true;

    setTimeout(() => {
      const response = this.getAIResponse(question);
      this.messages.push({ role: 'assistant', content: response });
      this.isTyping = false;
    }, 1000);
  }

  getAIResponse(question: string): string {
    const q = question.toLowerCase();
    
    if (q.includes('project') || q.includes('work')) {
      return 'I have several exciting projects including an E-Commerce Platform, AI Chat Application, and Task Management system. Each showcases different technologies and skills. Would you like to know more about any specific project?';
    }
    
    if (q.includes('skill') || q.includes('technology')) {
      return 'I\'m proficient in JavaScript, TypeScript, Angular, React, Node.js, Python, Docker, and AWS. I love working with modern web technologies and cloud platforms!';
    }
    
    if (q.includes('contact') || q.includes('email') || q.includes('hire')) {
      return 'You can reach me via email, GitHub, or LinkedIn. Check out the Contact section at the bottom of the page for all my social links!';
    }
    
    if (q.includes('experience') || q.includes('background')) {
      return 'I\'m a Full Stack Developer passionate about creating innovative solutions. I have experience with both frontend and backend technologies, and I love building scalable applications.';
    }

    if (q.includes('hello') || q.includes('hi') || q.includes('hey')) {
      return 'Hello! How can I help you today? Feel free to ask about my projects, skills, or experience!';
    }
    
    return 'That\'s an interesting question! Feel free to explore the portfolio to learn more about my work, or ask me about specific projects, skills, or how to get in touch!';
  }
}
