import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { ResumeService } from '../../core/services/resume.service';
import { Resume } from '../../core/models/resume.model';

@Component({
  selector: 'app-resume-list',
  standalone: true,
  imports: [CommonModule, RouterModule, DatePipe],
  template: `
    <div class="container">
      <div class="header">
        <h1>My Resumes</h1>
        <a routerLink="/upload" class="btn btn-primary">Upload New Resume</a>
      </div>
      
      <div class="loading-container" *ngIf="loading">
        <p>Loading resumes...</p>
      </div>
      
      <div class="empty-state" *ngIf="!loading && resumes.length === 0">
        <div class="empty-icon">📄</div>
        <h2>No Resumes Found</h2>
        <p>Upload your first resume to get started.</p>
        <a routerLink="/upload" class="btn btn-primary">Upload Resume</a>
      </div>
      
      <div class="resume-grid" *ngIf="!loading && resumes.length > 0">
        <div class="resume-card fade-in" *ngFor="let resume of resumes; let i = index" [style.animation-delay.s]="i * 0.1">
          <div class="resume-card-header">
            <h3>{{ resume.name }}</h3>
            <span class="resume-date">{{ resume.createdAt | date:'mediumDate' }}</span>
          </div>
          
          <div class="resume-info">
            <div class="info-row">
              <span class="info-label">Email:</span>
              <span>{{ resume.email }}</span>
            </div>
            <div class="info-row">
              <span class="info-label">Skills:</span>
              <span>{{ resume.skills.slice(0, 3).join(', ') }}{{ resume.skills.length > 3 ? '...' : '' }}</span>
            </div>
          </div>
          
          <div class="resume-actions">
            <a [routerLink]="['/resumes', resume._id]" class="btn btn-secondary">View</a>
            <a [routerLink]="['/resumes', resume._id, 'edit']" class="btn btn-secondary">Edit</a>
            <a [routerLink]="['/resumes', resume._id, 'generate']" class="btn btn-primary">Generate</a>
            <button class="btn btn-danger" (click)="deleteResume(resume._id)">Delete</button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: var(--space-6);
    }
    
    .loading-container {
      text-align: center;
      padding: var(--space-10);
      color: var(--neutral-600);
    }
    
    .empty-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: var(--space-12);
      background-color: white;
      border-radius: var(--border-radius-md);
      box-shadow: var(--shadow-md);
    }
    
    .empty-icon {
      font-size: 4rem;
      margin-bottom: var(--space-4);
      color: var(--neutral-400);
    }
    
    .empty-state h2 {
      margin-bottom: var(--space-2);
    }
    
    .empty-state p {
      margin-bottom: var(--space-6);
      color: var(--neutral-600);
    }
    
    .resume-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
      gap: var(--space-6);
    }
    
    .resume-card {
      background-color: white;
      border-radius: var(--border-radius-md);
      box-shadow: var(--shadow-md);
      padding: var(--space-6);
      transition: transform 0.2s ease, box-shadow 0.2s ease;
    }
    
    .resume-card:hover {
      transform: translateY(-4px);
      box-shadow: var(--shadow-lg);
    }
    
    .resume-card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: var(--space-4);
      padding-bottom: var(--space-3);
      border-bottom: 1px solid var(--neutral-200);
    }
    
    .resume-card-header h3 {
      margin: 0;
    }
    
    .resume-date {
      font-size: 0.875rem;
      color: var(--neutral-500);
    }
    
    .resume-info {
      margin-bottom: var(--space-4);
    }
    
    .info-row {
      display: flex;
      margin-bottom: var(--space-2);
    }
    
    .info-label {
      width: 80px;
      font-weight: 500;
      color: var(--neutral-700);
    }
    
    .resume-actions {
      display: flex;
      gap: var(--space-3);
    }

    .btn-danger {
      background-color: var(--error-500);
      color: white;
    }

    .btn-danger:hover {
      background-color: var(--error-600);
    }
    
    @media (max-width: 768px) {
      .header {
        flex-direction: column;
        align-items: flex-start;
        gap: var(--space-4);
      }
      
      .resume-grid {
        grid-template-columns: 1fr;
      }

      .resume-actions {
        flex-wrap: wrap;
      }
    }
  `]
})
export class ResumeListComponent implements OnInit {
  resumes: Resume[] = [];
  loading = true;

  constructor(
    private resumeService: ResumeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadResumes();
  }

  loadResumes(): void {
    this.resumeService.getResumes().subscribe({
      next: (data) => {
        this.resumes = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error fetching resumes:', error);
        this.loading = false;
      }
    });
  }

  deleteResume(id: string): void {
    if (confirm('Are you sure you want to delete this resume?')) {
      this.resumeService.deleteResume(id).subscribe({
        next: () => {
          this.resumes = this.resumes.filter(resume => resume._id !== id);
        },
        error: (error) => {
          console.error('Error deleting resume:', error);
          alert('Failed to delete resume. Please try again.');
        }
      });
    }
  }
}