import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { ResumeTemplate } from '../models/resume.model';

@Injectable({
  providedIn: 'root'
})
export class TemplateService {
  private apiUrl = 'http://localhost:3000/api';
  
  private templates: ResumeTemplate[] = [
    {
      id: 'simple',
      name: 'Simple',
      description: 'A minimalist template focusing on content clarity and readability.',
      imageUrl: 'https://images.pexels.com/photos/4348403/pexels-photo-4348403.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    {
      id: 'test',
      name: 'test',
      description: 'A minimalist template focusing on content clarity and readability.',
      imageUrl: 'https://images.pexels.com/photos/4348403/pexels-photo-4348403.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    {
      id: 'professional',
      name: 'Professional',
      description: 'A clean, professional template suitable for most industries.',
      imageUrl: 'https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    {
      id: 'modern',
      name: 'Modern',
      description: 'A contemporary design with a fresh layout and modern typography.',
      imageUrl: 'https://images.pexels.com/photos/1764956/pexels-photo-1764956.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    {
      id: 'executive',
      name: 'Executive',
      description: 'An elegant template for senior positions and leadership roles.',
      imageUrl: 'https://images.pexels.com/photos/936137/pexels-photo-936137.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    {
      id: 'executive1',
      name: 'Executive1',
      description: 'An elegant template for senior positions and leadership roles .',
      imageUrl: 'https://images.pexels.com/photos/936137/pexels-photo-936137.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    {
      id: 'creative',
      name: 'Creative',
      description: 'A bold design for creative industries and design roles.',
      imageUrl: 'https://images.pexels.com/photos/3184632/pexels-photo-3184632.jpeg?auto=compress&cs=tinysrgb&w=600'
    }
  ];

  constructor(private http: HttpClient) {}

  getTemplates(): Observable<ResumeTemplate[]> {
    // For now, return local templates. In a real app, you might fetch from API
    return of(this.templates);
  }

  getTemplateById(id: string): Observable<ResumeTemplate | undefined> {
    return of(this.templates.find(template => template.id === id));
  }
}