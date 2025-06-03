import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ResumeService } from '../../core/services/resume.service';
import { TemplateService } from '../../core/services/template.service';
import { Resume, ResumeTemplate } from '../../core/models/resume.model';

@Component({
  selector: 'app-resume-generate',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <div class="container">
      <div class="loading-container" *ngIf="loading">
        <p>Loading templates and resume data...</p>
      </div>
      
      <div class="generate-container" *ngIf="!loading && resume">
        <div class="generate-header">
          <h1>Generate Resume</h1>
          <p class="subtitle">Choose a template to generate a Word document based on {{ resume.name }}'s data.</p>
        </div>
        
        <div class="templates-grid">
          <div 
            *ngFor="let template of templates" 
            class="template-card" 
            [class.selected]="selectedTemplate === template.id"
            (click)="selectTemplate(template.id)">
            
            <div class="template-image">
              <img [src]="template.imageUrl" [alt]="template.name" />
            </div>
            
            <div class="template-info">
              <h3>{{ template.name }}</h3>
              <p>{{ template.description }}</p>
            </div>
            
            <div class="template-overlay" *ngIf="selectedTemplate === template.id">
              <div class="check-icon">✓</div>
            </div>
          </div>
        </div>
        
        <div class="template-preview" *ngIf="selectedTemplate">
          <h2>Template Preview</h2>
          <div class="preview-content">
            <p class="preview-note">
              Your resume will be generated as a Word document (.docx) based on the data you've provided.
              You'll be able to download and edit the document as needed.
            </p>
          </div>
        </div>
        
        <div class="generate-actions">
          <a [routerLink]="['/resumes', resumeId]" class="btn btn-secondary">Cancel</a>
          <button 
            class="btn btn-primary" 
            [disabled]="!selectedTemplate || generating" 
            (click)="generateResume()">
            {{ generating ? 'Generating...' : 'Generate Resume' }}
          </button>
        </div>
      </div>
      
      <div class="success-container slide-up" *ngIf="downloadUrl">
        <div class="success-icon">✅</div>
        <h2>Resume Generated Successfully!</h2>
        <p>Your resume has been generated and is ready for download.</p>
        <div class="download-actions">
          <button class="btn btn-primary" (click)="downloadResume()">Download Resume</button>
          <a [routerLink]="['/resumes', resumeId]" class="btn btn-secondary">Back to Resume</a>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .loading-container {
      text-align: center;
      padding: var(--space-10);
      color: var(--neutral-600);
    }
    
    .generate-container {
      background-color: white;
      border-radius: var(--border-radius-md);
      box-shadow: var(--shadow-md);
      padding: var(--space-6);
      margin-bottom: var(--space-6);
    }
    
    .generate-header {
      margin-bottom: var(--space-6);
    }
    
    .subtitle {
      color: var(--neutral-600);
      margin-top: var(--space-2);
    }
    
    .templates-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      gap: var(--space-6);
      margin-bottom: var(--space-8);
    }
    
    .template-card {
      border-radius: var(--border-radius-md);
      box-shadow: var(--shadow-md);
      overflow: hidden;
      cursor: pointer;
      transition: transform 0.2s ease, box-shadow 0.2s ease;
      position: relative;
    }
    
    .template-card:hover {
      transform: translateY(-4px);
      box-shadow: var(--shadow-lg);
    }
    
    .template-card.selected {
      border: 2px solid var(--primary-600);
      transform: translateY(-4px);
      box-shadow: var(--shadow-lg);
    }
    
    .template-image {
      height: 180px;
      overflow: hidden;
      background-color: var(--neutral-100);
    }
    
    .template-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.3s ease;
    }
    
    .template-card:hover .template-image img {
      transform: scale(1.05);
    }
    
    .template-info {
      padding: var(--space-4);
    }
    
    .template-info h3 {
      margin-bottom: var(--space-2);
    }
    
    .template-info p {
      color: var(--neutral-600);
      font-size: 0.9rem;
    }
    
    .template-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(37, 99, 235, 0.1);
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .check-icon {
      background-color: var(--primary-600);
      color: white;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.5rem;
    }
    
    .template-preview {
      background-color: var(--neutral-50);
      padding: var(--space-6);
      border-radius: var(--border-radius-md);
      margin-bottom: var(--space-6);
    }
    
    .preview-content {
      margin-top: var(--space-4);
    }
    
    .preview-note {
      color: var(--neutral-700);
    }
    
    .generate-actions {
      display: flex;
      justify-content: flex-end;
      gap: var(--space-3);
    }
    
    .success-container {
      background-color: white;
      border-radius: var(--border-radius-md);
      box-shadow: var(--shadow-md);
      padding: var(--space-8);
      text-align: center;
      max-width: 600px;
      margin: 0 auto;
    }
    
    .success-icon {
      font-size: 3rem;
      margin-bottom: var(--space-4);
    }
    
    .download-actions {
      display: flex;
      justify-content: center;
      gap: var(--space-4);
      margin-top: var(--space-6);
    }
    
    @media (max-width: 768px) {
      .templates-grid {
        grid-template-columns: 1fr;
      }
      
      .download-actions {
        flex-direction: column;
        gap: var(--space-3);
      }
    }
  `]
})
export class ResumeGenerateComponent implements OnInit {
  resumeId: string = '';
  resume: Resume | null = null;
  templates: ResumeTemplate[] = [];
  selectedTemplate: string = '';
  loading = true;
  generating = false;
  downloadUrl: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private resumeService: ResumeService,
    private templateService: TemplateService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.resumeId = id;
        this.loadData(id);
      } else {
        this.router.navigate(['/resumes']);
      }
    });
  }

  loadData(id: string): void {
    // Load both resume and templates in parallel
    const resumeData$ = this.resumeService.getResumeById(id);
    const templates$ = this.templateService.getTemplates();
    
    Promise.all([
      resumeData$.toPromise(),
      templates$.toPromise()
    ]).then(([resumeData, templatesData]) => {
      this.resume = resumeData as Resume;
      this.templates = templatesData as ResumeTemplate[];
      this.loading = false;
    }).catch(error => {
      console.error('Error loading data:', error);
      this.loading = false;
    });
  }

  selectTemplate(templateId: string): void {
    this.selectedTemplate = templateId;
  }

  generateResume(): void {
    if (!this.selectedTemplate || !this.resumeId) {
      return;
    }
    
    this.generating = true;
    this.resumeService.generateResume(this.resumeId, this.selectedTemplate).subscribe({
      next: (response) => {
        this.downloadUrl = response.downloadUrl;
        this.generating = false;
      },
      error: (error) => {
        console.error('Error generating resume:', error);
        this.generating = false;
        alert('Failed to generate resume. Please try again.');
      }
    });
  }

  downloadResume(): void {
    if (!this.downloadUrl) {
      console.error('No download URL available');
      return;
    }
    
    console.log('Starting download from URL:', this.downloadUrl);
    
    this.resumeService.downloadGeneratedResume(this.downloadUrl).subscribe({
      next: (blob) => {
        if (!blob) {
          console.error('Received empty blob');
          alert('Error: Received empty file data');
          return;
        }

        console.log('Received blob:', {
          size: blob.size,
          type: blob.type,
          isBlob: blob instanceof Blob
        });

        if (blob.size === 0) {
          console.error('Received zero-size blob');
          alert('Error: Received empty file');
          return;
        }

        if (!blob.type.includes('application/vnd.openxmlformats-officedocument.wordprocessingml.document')) {
          console.warn('Unexpected file type:', blob.type);
        }

        // Create a temporary URL for the blob
        const url = window.URL.createObjectURL(blob);
        console.log('Created blob URL:', url);
        
        // Create a hidden link element
        const link = document.createElement('a');
        link.style.display = 'none';
        link.href = url;
        
        // Set the filename
        const filename = `${this.resume?.name.replace(/[^a-zA-Z0-9]/g, '_')}_resume.docx`;
        link.download = filename;
        
        console.log('Initiating download with:', {
          filename,
          blobUrl: url,
          blobSize: blob.size,
          blobType: blob.type
        });

        // Add to document, click it, and remove it
        document.body.appendChild(link);
        link.click();
        
        // Clean up
        setTimeout(() => {
          window.URL.revokeObjectURL(url);
          document.body.removeChild(link);
          console.log('Cleaned up blob URL and link element');
        }, 100);
      },
      error: (error) => {
        console.error('Error downloading resume:', error);
        console.error('Error details:', {
          status: error.status,
          statusText: error.statusText,
          message: error.message,
          url: error.url,
          type: error.type,
          headers: error.headers?.keys?.()
        });
        alert('Failed to download resume. Please try again.');
      }
    });
  }
}