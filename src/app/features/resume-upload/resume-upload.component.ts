import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ResumeService } from '../../core/services/resume.service';

@Component({
  selector: 'app-resume-upload',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <div class="container">
      <div class="card upload-card slide-up">
        <h1>Upload Your Resume</h1>
        <p class="subtitle">Upload your PDF resume to extract information and create custom templates.</p>
        
        <div class="upload-container" 
             [class.drag-over]="isDragOver"
             (dragover)="onDragOver($event)" 
             (dragleave)="onDragLeave()"
             (drop)="onDrop($event)">
          
          <div class="upload-placeholder" *ngIf="!selectedFile && !isUploading">
            <div class="upload-icon">📄</div>
            <p>Drag & drop your PDF resume or</p>
            <label class="btn btn-primary">
              Browse Files
              <input 
                type="file" 
                accept=".pdf" 
                style="display: none" 
                (change)="onFileSelected($event)">
            </label>
          </div>
          
          <div class="file-info" *ngIf="selectedFile && !isUploading">
            <div class="file-name">{{ selectedFile.name }}</div>
            <div class="file-actions">
              <button class="btn btn-secondary" (click)="clearSelectedFile()">Change</button>
              <button class="btn btn-primary" (click)="uploadFile()">Upload</button>
            </div>
          </div>
          
          <div class="upload-progress" *ngIf="isUploading">
            <div class="progress-bar">
              <div class="progress-value" [style.width.%]="uploadProgress"></div>
            </div>
            <p>Uploading and parsing... {{ uploadProgress }}%</p>
          </div>
        </div>
        
        <div class="upload-error" *ngIf="errorMessage">
          <p>{{ errorMessage }}</p>
        </div>
        
        <div class="upload-tips">
          <h3>Tips for best results:</h3>
          <ul>
            <li>Upload a PDF file for best parsing accuracy</li>
            <li>Ensure your resume is text-based, not a scanned image</li>
            <li>Make sure your contact information is clearly visible</li>
            <li>Structure your experience and education in a consistent format</li>
          </ul>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .upload-card {
      max-width: 800px;
      margin: 0 auto;
    }
    
    h1 {
      margin-bottom: var(--space-2);
    }
    
    .subtitle {
      color: var(--neutral-600);
      margin-bottom: var(--space-6);
    }
    
    .upload-container {
      border: 2px dashed var(--neutral-300);
      border-radius: var(--border-radius-md);
      padding: var(--space-10);
      margin-bottom: var(--space-6);
      transition: all 0.3s ease;
    }
    
    .drag-over {
      border-color: var(--primary-500);
      background-color: var(--primary-50);
    }
    
    .upload-placeholder {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: var(--space-4);
    }
    
    .upload-icon {
      font-size: 3rem;
      margin-bottom: var(--space-2);
    }
    
    .file-info {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    
    .file-name {
      font-weight: 500;
    }
    
    .file-actions {
      display: flex;
      gap: var(--space-3);
    }
    
    .upload-progress {
      text-align: center;
    }
    
    .progress-bar {
      height: 8px;
      background-color: var(--neutral-200);
      border-radius: 4px;
      margin-bottom: var(--space-3);
      overflow: hidden;
    }
    
    .progress-value {
      height: 100%;
      background-color: var(--primary-500);
      transition: width 0.3s ease;
    }
    
    .upload-error {
      color: var(--error-500);
      background-color: rgba(239, 68, 68, 0.1);
      padding: var(--space-3);
      border-radius: var(--border-radius-md);
      margin-bottom: var(--space-6);
    }
    
    .upload-tips {
      background-color: var(--neutral-50);
      padding: var(--space-4);
      border-radius: var(--border-radius-md);
    }
    
    .upload-tips h3 {
      font-size: 1.1rem;
      margin-bottom: var(--space-3);
    }
    
    .upload-tips ul {
      padding-left: var(--space-5);
      color: var(--neutral-700);
    }
    
    .upload-tips li {
      margin-bottom: var(--space-2);
    }
  `]
})
export class ResumeUploadComponent {
  selectedFile: File | null = null;
  isDragOver = false;
  isUploading = false;
  uploadProgress = 0;
  errorMessage = '';

  constructor(
    private resumeService: ResumeService,
    private router: Router
  ) {}

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver = true;
  }

  onDragLeave(): void {
    this.isDragOver = false;
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver = false;
    
    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      this.handleFile(files[0]);
    }
  }

  onFileSelected(event: Event): void {
    const element = event.target as HTMLInputElement;
    const files = element.files;
    
    if (files && files.length > 0) {
      this.handleFile(files[0]);
    }
  }

  handleFile(file: File): void {
    if (file.type !== 'application/pdf') {
      this.errorMessage = 'Please upload a PDF file.';
      return;
    }
    
    this.selectedFile = file;
    this.errorMessage = '';
  }

  clearSelectedFile(): void {
    this.selectedFile = null;
  }

  uploadFile(): void {
    if (!this.selectedFile) {
      return;
    }
    
    this.isUploading = true;
    this.uploadProgress = 0;
    
    // Simulate progress for better UX
    const progressInterval = setInterval(() => {
      if (this.uploadProgress < 90) {
        this.uploadProgress += 10;
      }
    }, 500);
    
    this.resumeService.uploadResume(this.selectedFile).subscribe({
      next: (response) => {
        clearInterval(progressInterval);
        this.uploadProgress = 100;
        
        setTimeout(() => {
          this.isUploading = false;
          this.router.navigate(['/resumes', response._id]);
        }, 500);
      },
      error: (error) => {
        clearInterval(progressInterval);
        this.isUploading = false;
        this.errorMessage = 'Failed to upload and parse the resume. Please try again.';
        console.error('Upload error:', error);
      }
    });
  }
}