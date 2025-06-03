import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ResumeService } from '../../core/services/resume.service';
import { Resume } from '../../core/models/resume.model';

@Component({
  selector: 'app-resume-list',
  templateUrl: './resume-list.component.html',
  styleUrls: ['./resume-list.component.css']
})
export class ResumeListComponent implements OnInit {
  resumes: Resume[] = [];

  constructor(
    private resumeService: ResumeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadResumes();
  }

  loadResumes(): void {
    this.resumeService.getAllResumes().subscribe({
      next: (resumes) => {
        this.resumes = resumes;
      },
      error: (error) => {
        console.error('Error fetching resumes:', error);
      }
    });
  }

  viewResume(id: string): void {
    this.router.navigate(['/resumes', id]);
  }

  deleteResume(id: string): void {
    if (confirm('Are you sure you want to delete this resume?')) {
      this.resumeService.deleteResume(id).subscribe({
        next: () => {
          // Remove the deleted resume from the list
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