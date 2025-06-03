import { Routes } from '@angular/router';

export const routes: Routes = [
  { 
    path: '', 
    loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent) 
  },
  { 
    path: 'upload', 
    loadComponent: () => import('./features/resume-upload/resume-upload.component').then(m => m.ResumeUploadComponent) 
  },
  { 
    path: 'resumes',
    loadComponent: () => import('./features/resume-list/resume-list.component').then(m => m.ResumeListComponent)
  },
  { 
    path: 'resumes/:id', 
    loadComponent: () => import('./features/resume-details/resume-details.component').then(m => m.ResumeDetailsComponent) 
  },
  { 
    path: 'resumes/:id/edit', 
    loadComponent: () => import('./features/resume-edit/resume-edit.component').then(m => m.ResumeEditComponent) 
  },
  { 
    path: 'resumes/:id/generate', 
    loadComponent: () => import('./features/resume-generate/resume-generate.component').then(m => m.ResumeGenerateComponent) 
  },
  { 
    path: '**', 
    redirectTo: '' 
  }
];