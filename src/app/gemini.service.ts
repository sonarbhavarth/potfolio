import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GeminiService {
  private apiUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

  async generateText(prompt: string): Promise<string> {
    try {
      const response = await fetch(`${this.apiUrl}?key=${environment.geminiApiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }]
        })
      });

      const data = await response.json();
      return data.candidates[0].content.parts[0].text;
    } catch (error) {
      console.error('Gemini API error:', error);
      throw error;
    }
  }

  async generateProjectDescription(projectName: string, technologies: string): Promise<string> {
    const prompt = `Write a professional, concise project description (2-3 sentences) for a portfolio project called "${projectName}" that uses ${technologies}. Focus on key features and impact.`;
    return this.generateText(prompt);
  }

  async generateProjectSummary(projectName: string, description: string): Promise<string> {
    const prompt = `Expand this project description into a detailed summary (3-4 sentences) for "${projectName}": ${description}. Include technical details and benefits.`;
    return this.generateText(prompt);
  }

  async generateBio(name: string, skills: string): Promise<string> {
    const prompt = `Write a professional bio (1-2 sentences) for a developer named ${name} with skills in ${skills}.`;
    return this.generateText(prompt);
  }
}
