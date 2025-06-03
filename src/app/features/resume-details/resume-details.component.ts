import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { ResumeService } from '../../core/services/resume.service';
import { Resume } from '../../core/models/resume.model';

@Component({
  selector: 'app-resume-details',
  standalone: true,
  imports: [CommonModule, RouterModule, DatePipe],
  template: `
    <div class="container">
      <div class="loading-container" *ngIf="loading">
        <p>Loading resume details...</p>
      </div>
      
      <div class="resume-container" *ngIf="!loading && resume">
        <div class="resume-header">
          <div>
            <h1>{{ resume.name }}</h1>
            <p class="resume-meta">Uploaded on {{ resume.createdAt | date:'mediumDate' }}</p>
          </div>
          <div class="resume-actions">
            <a [routerLink]="['/resumes', resume._id, 'edit']" class="btn btn-secondary">Edit</a>
            <a [routerLink]="['/resumes', resume._id, 'generate']" class="btn btn-primary">Generate Resume</a>
          </div>
        </div>
        
        <div class="resume-content">
          <div class="resume-sidebar">
            <div class="section">
              <h2>Contact Information</h2>
              <div class="contact-info">
                <div class="info-item">
                  <span class="info-label">Email:</span>
                  <span>{{ resume.email }}</span>
                </div>
                <div class="info-item" *ngIf="resume.phone">
                  <span class="info-label">Phone:</span>
                  <span>{{ resume.phone }}</span>
                </div>
              </div>
            </div>
            
            <div class="section">
              <h2>Skills</h2>
              <ul class="skills-list">
                <li *ngFor="let skill of resume.skills">{{ skill }}</li>
              </ul>
            </div>
            
            <div class="section">
              <h2>Original PDF</h2>
              <a [href]="resume.pdfUrl" target="_blank" class="btn btn-secondary btn-block">
                View Original PDF
              </a>
            </div>
          </div>
          
          <div class="resume-main">
            <div class="section">
              <h2>Experience</h2>
              <div class="timeline">
                <div class="timeline-item" *ngFor="let exp of resume.experience">
                  <div class="timeline-marker"></div>
                  <div class="timeline-content">
                    <h3>{{ exp.title }}</h3>
                    <h4>{{ exp.company }}{{ exp.location ? ' - ' + exp.location : '' }}</h4>
                    <p class="timeline-period">
                      {{ exp.startDate | date:'MMM yyyy' }} - 
                      {{ exp.current ? 'Present' : (exp.endDate | date:'MMM yyyy') }}
                    </p>
                    <p class="timeline-description">{{ exp.description }}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="section">
              <h2>Education</h2>
              <div class="timeline">
                <div class="timeline-item" *ngFor="let edu of resume.education">
                  <div class="timeline-marker"></div>
                  <div class="timeline-content">
                    <h3>{{ edu.degree }}{{ edu.field ? ' in ' + edu.field : '' }}</h3>
                    <h4>{{ edu.institution }}{{ edu.location ? ' - ' + edu.location : '' }}</h4>
                    <p class="timeline-period">
                      {{ edu.startDate | date:'MMM yyyy' }} - 
                      {{ edu.endDate | date:'MMM yyyy' }}
                    </p>
                    <p class="timeline-description" *ngIf="edu.description">{{ edu.description }}</p>
                    <p *ngIf="edu.gpa">GPA: {{ edu.gpa }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="not-found" *ngIf="!loading && !resume">
        <h2>Resume Not Found</h2>
        <p>The resume you're looking for doesn't exist or has been deleted.</p>
        <a routerLink="/resumes" class="btn btn-primary">Back to My Resumes</a>
      </div>
    </div>
  `,
  styles: [`
    .loading-container {
      text-align: center;
      padding: var(--space-10);
      color: var(--neutral-600);
    }
    
    .resume-container {
      background-color: white;
      border-radius: var(--border-radius-md);
      box-shadow: var(--shadow-md);
      overflow: hidden;
    }
    
    .resume-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: var(--space-6);
      border-bottom: 1px solid var(--neutral-200);
    }
    
    .resume-meta {
      color: var(--neutral-600);
      margin-top: var(--space-1);
    }
    
    .resume-actions {
      display: flex;
      gap: var(--space-3);
    }
    
    .resume-content {
      display: flex;
      min-height: 500px;
    }
    
    .resume-sidebar {
      width: 300px;
      padding: var(--space-6);
      background-color: var(--neutral-50);
      border-right: 1px solid var(--neutral-200);
    }
    
    .resume-main {
      flex: 1;
      padding: var(--space-6);
    }
    
    .section {
      margin-bottom: var(--space-8);
    }
    
    .section h2 {
      font-size: 1.25rem;
      margin-bottom: var(--space-4);
      padding-bottom: var(--space-2);
      border-bottom: 2px solid var(--primary-100);
    }
    
    .contact-info {
      margin-bottom: var(--space-4);
    }
    
    .info-item {
      margin-bottom: var(--space-2);
    }
    
    .info-label {
      font-weight: 500;
      margin-right: var(--space-2);
      color: var(--neutral-700);
    }
    
    .skills-list {
      list-style-type: none;
      padding: 0;
      margin: 0;
    }
    
    .skills-list li {
      background-color: var(--primary-100);
      color: var(--primary-700);
      padding: var(--space-1) var(--space-3);
      border-radius: var(--border-radius-sm);
      display: inline-block;
      margin: 0 var(--space-2) var(--space-2) 0;
    }
    
    .btn-block {
      display: block;
      width: 100%;
      text-align: center;
    }
    
    .timeline {
      position: relative;
      padding-left: var(--space-6);
    }
    
    .timeline::before {
      content: '';
      position: absolute;
      left: 7px;
      top: 0;
      bottom: 0;
      width: 2px;
      background-color: var(--neutral-300);
    }
    
    .timeline-item {
      position: relative;
      margin-bottom: var(--space-6);
    }
    
    .timeline-marker {
      position: absolute;
      left: -24px;
      top: 6px;
      width: 14px;
      height: 14px;
      border-radius: 50%;
      background-color: var(--primary-500);
      border: 2px solid white;
    }
    
    .timeline-content h3 {
      font-size: 1.1rem;
      margin: 0 0 var(--space-1);
    }
    
    .timeline-content h4 {
      font-size: 1rem;
      font-weight: 500;
      color: var(--neutral-700);
      margin: 0 0 var(--space-1);
    }
    
    .timeline-period {
      font-size: 0.875rem;
      color: var(--neutral-500);
      margin-bottom: var(--space-2);
    }
    
    .timeline-description {
      color: var(--neutral-700);
      white-space: pre-line;
    }
    
    .not-found {
      text-align: center;
      padding: var(--space-10);
    }
    
    @media (max-width: 768px) {
      .resume-header {
        flex-direction: column;
        align-items: flex-start;
        gap: var(--space-4);
      }
      
      .resume-content {
        flex-direction: column;
      }
      
      .resume-sidebar {
        width: 100%;
        border-right: none;
        border-bottom: 1px solid var(--neutral-200);
      }
    }
  `]
})
export class ResumeDetailsComponent implements OnInit {
  resumeId: string = '';
  resume: Resume | null = null;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private resumeService: ResumeService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.resumeId = id;
        this.loadResume(id);
      } else {
        this.router.navigate(['/resumes']);
      }
    });
  }

  loadResume(id: string): void {
    this.resumeService.getResumeById(id).subscribe({
      next: (data) => {
        this.resume = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error fetching resume:', error);
        this.loading = false;
      }
    });
  }
}