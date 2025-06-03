import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ResumeService } from '../../core/services/resume.service';
import { Resume } from '../../core/models/resume.model';

@Component({
  selector: 'app-resume-edit',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
  template: `
    <div class="container">
      <div class="loading-container" *ngIf="loading">
        <p>Loading resume data...</p>
      </div>
      
      <div class="resume-edit-container" *ngIf="!loading && resumeForm">
        <div class="edit-header">
          <h1>Edit Resume</h1>
          <div class="edit-actions">
            <button type="button" class="btn btn-secondary" (click)="cancel()">Cancel</button>
            <button type="button" class="btn btn-primary" (click)="saveResume()" [disabled]="saving">
              {{ saving ? 'Saving...' : 'Save Changes' }}
            </button>
          </div>
        </div>
        
        <form [formGroup]="resumeForm" class="edit-form" (ngSubmit)="saveResume()">
          <div class="form-section">
            <h2>Personal Information</h2>
            <div class="form-grid">
              <div class="form-group">
                <label class="form-label" for="name">Full Name</label>
                <input id="name" type="text" class="form-control" formControlName="name">
                <div class="validation-error" *ngIf="resumeForm.get('name')?.invalid && resumeForm.get('name')?.touched">
                  Name is required
                </div>
              </div>
              
              <div class="form-group">
                <label class="form-label" for="email">Email</label>
                <input id="email" type="email" class="form-control" formControlName="email">
                <div class="validation-error" *ngIf="resumeForm.get('email')?.invalid && resumeForm.get('email')?.touched">
                  Valid email is required
                </div>
              </div>
              
              <div class="form-group">
                <label class="form-label" for="phone">Phone Number</label>
                <input id="phone" type="tel" class="form-control" formControlName="phone">
              </div>
            </div>
          </div>
          
          <div class="form-section">
            <h2>Skills</h2>
            <div formArrayName="skills">
              <div class="skills-container">
                <div *ngFor="let skill of skillsFormArray.controls; let i = index" class="skill-item">
                  <input type="text" class="form-control" [formControlName]="i">
                  <button type="button" class="btn-icon" (click)="removeSkill(i)" title="Remove skill">×</button>
                </div>
              </div>
              <button type="button" class="btn btn-secondary" (click)="addSkill()">Add Skill</button>
            </div>
          </div>
          
          <div class="form-section">
            <h2>Experience</h2>
            <div formArrayName="experience">
              <div *ngFor="let exp of experienceFormArray.controls; let i = index" class="experience-item card">
                <div [formGroupName]="i">
                  <div class="form-grid">
                    <div class="form-group">
                      <label class="form-label">Job Title</label>
                      <input type="text" class="form-control" formControlName="title">
                    </div>
                    
                    <div class="form-group">
                      <label class="form-label">Company</label>
                      <input type="text" class="form-control" formControlName="company">
                    </div>
                    
                    <div class="form-group">
                      <label class="form-label">Location (Optional)</label>
                      <input type="text" class="form-control" formControlName="location">
                    </div>
                    
                    <div class="form-group">
                      <label class="form-label">Start Date</label>
                      <input type="month" class="form-control" formControlName="startDate">
                    </div>
                    
                    <div class="form-group" *ngIf="!exp.get('current')?.value">
                      <label class="form-label">End Date</label>
                      <input type="month" class="form-control" formControlName="endDate">
                    </div>
                    
                    <div class="form-group form-checkbox">
                      <label>
                        <input type="checkbox" formControlName="current">
                        Current Position
                      </label>
                    </div>
                  </div>
                  
                  <div class="form-group">
                    <label class="form-label">Description</label>
                    <textarea class="form-control" formControlName="description" rows="4"></textarea>
                  </div>
                  
                  <button type="button" class="btn btn-danger" (click)="removeExperience(i)">Remove Experience</button>
                </div>
              </div>
              
              <button type="button" class="btn btn-secondary" (click)="addExperience()">Add Experience</button>
            </div>
          </div>
          
          <div class="form-section">
            <h2>Education</h2>
            <div formArrayName="education">
              <div *ngFor="let edu of educationFormArray.controls; let i = index" class="education-item card">
                <div [formGroupName]="i">
                  <div class="form-grid">
                    <div class="form-group">
                      <label class="form-label">Institution</label>
                      <input type="text" class="form-control" formControlName="institution">
                    </div>
                    
                    <div class="form-group">
                      <label class="form-label">Degree</label>
                      <input type="text" class="form-control" formControlName="degree">
                    </div>
                    
                    <div class="form-group">
                      <label class="form-label">Field of Study (Optional)</label>
                      <input type="text" class="form-control" formControlName="field">
                    </div>
                    
                    <div class="form-group">
                      <label class="form-label">Location (Optional)</label>
                      <input type="text" class="form-control" formControlName="location">
                    </div>
                    
                    <div class="form-group">
                      <label class="form-label">Start Date</label>
                      <input type="month" class="form-control" formControlName="startDate">
                    </div>
                    
                    <div class="form-group">
                      <label class="form-label">End Date</label>
                      <input type="month" class="form-control" formControlName="endDate">
                    </div>
                    
                    <div class="form-group">
                      <label class="form-label">GPA (Optional)</label>
                      <input type="number" step="0.01" min="0" max="4.0" class="form-control" formControlName="gpa">
                    </div>
                  </div>
                  
                  <div class="form-group">
                    <label class="form-label">Description (Optional)</label>
                    <textarea class="form-control" formControlName="description" rows="4"></textarea>
                  </div>
                  
                  <button type="button" class="btn btn-danger" (click)="removeEducation(i)">Remove Education</button>
                </div>
              </div>
              
              <button type="button" class="btn btn-secondary" (click)="addEducation()">Add Education</button>
            </div>
          </div>
           <div class="form-actions">
          <button type="button" class="btn btn-secondary" (click)="cancel()">Cancel</button>
          <button type="button" class="btn btn-primary" (click)="saveResume()" [disabled]="saving">
            {{ saving ? 'Saving...' : 'Save Changes' }}
          </button>
        </div>
        </form>
        
       
      </div>
    </div>
  `,
  styles: [`
    .loading-container {
      text-align: center;
      padding: var(--space-10);
      color: var(--neutral-600);
    }
    
    .resume-edit-container {
      background-color: white;
      border-radius: var(--border-radius-md);
      box-shadow: var(--shadow-md);
      padding: var(--space-6);
      margin-bottom: var(--space-6);
    }
    
    .edit-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: var(--space-6);
      padding-bottom: var(--space-4);
      border-bottom: 1px solid var(--neutral-200);
    }
    
    .edit-actions {
      display: flex;
      gap: var(--space-3);
    }
    
    .form-section {
      margin-bottom: var(--space-8);
    }
    
    .form-section h2 {
      font-size: 1.25rem;
      margin-bottom: var(--space-4);
      padding-bottom: var(--space-2);
      border-bottom: 2px solid var(--primary-100);
    }
    
    .form-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: var(--space-4);
    }
    
    .validation-error {
      color: var(--error-500);
      font-size: 0.875rem;
      margin-top: var(--space-1);
    }
    
    .skills-container {
      display: flex;
      flex-wrap: wrap;
      gap: var(--space-2);
      margin-bottom: var(--space-4);
    }
    
    .skill-item {
      display: flex;
      align-items: center;
    }
    
    .btn-icon {
      background: none;
      border: none;
      color: var(--neutral-500);
      font-size: 1.5rem;
      cursor: pointer;
      padding: 0 var(--space-2);
    }
    
    .btn-icon:hover {
      color: var(--error-500);
    }
    
    .experience-item, .education-item {
      margin-bottom: var(--space-6);
      padding: var(--space-4);
    }
    
    .form-checkbox {
      display: flex;
      align-items: center;
      gap: var(--space-2);
    }
    
    .form-checkbox input {
      margin-right: var(--space-2);
    }
    
    .btn-danger {
      background-color: var(--error-500);
      color: white;
    }
    
    .btn-danger:hover {
      background-color: #DC2626;
    }
    
    .form-actions {
      display: flex;
      justify-content: flex-end;
      gap: var(--space-3);
      margin-top: var(--space-6);
      padding-top: var(--space-6);
      border-top: 1px solid var(--neutral-200);
    }
    
    @media (max-width: 768px) {
      .edit-header {
        flex-direction: column;
        align-items: flex-start;
        gap: var(--space-4);
      }
      
      .form-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class ResumeEditComponent implements OnInit {
  resumeId: string = '';
  resumeForm: FormGroup | null = null;
  loading = true;
  saving = false;

  constructor(
    private fb: FormBuilder,
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

  get skillsFormArray(): FormArray {
    return this.resumeForm?.get('skills') as FormArray;
  }

  get experienceFormArray(): FormArray {
    return this.resumeForm?.get('experience') as FormArray;
  }

  get educationFormArray(): FormArray {
    return this.resumeForm?.get('education') as FormArray;
  }

  loadResume(id: string): void {
    this.resumeService.getResumeById(id).subscribe({
      next: (data) => {
        this.initForm(data);
        this.loading = false;
      },
      error: (error) => {
        console.error('Error fetching resume:', error);
        this.loading = false;
      }
    });
  }

  initForm(resume: Resume): void {
    this.resumeForm = this.fb.group({
      name: [resume.name, Validators.required],
      email: [resume.email, [Validators.required, Validators.email]],
      phone: [resume.phone || ''],
      skills: this.fb.array((resume.skills || []).map(skill => this.fb.control(skill))),
      experience: this.fb.array(
        (resume.experience || []).map(exp => this.fb.group({
          title: [exp.title, Validators.required],
          company: [exp.company, Validators.required],
          location: [exp.location || ''],
          startDate: [this.formatDateForInput(exp.startDate), Validators.required],
          endDate: [this.formatDateForInput(exp.endDate)],
          current: [exp.current || false],
          description: [exp.description, Validators.required]
        }))
      ),
      education: this.fb.array(
        (resume.education || []).map(edu => this.fb.group({
          institution: [edu.institution, Validators.required],
          degree: [edu.degree, Validators.required],
          field: [edu.field || ''],
          location: [edu.location || ''],
          startDate: [this.formatDateForInput(edu.startDate), Validators.required],
          endDate: [this.formatDateForInput(edu.endDate), Validators.required],
          gpa: [edu.gpa || ''],
          description: [edu.description || '']
        }))
      )
    });
  }

  formatDateForInput(date: string | Date | undefined): string {
    if (!date) return '';
    
    const d = typeof date === 'string' ? new Date(date) : date;
    const year = d.getFullYear();
    const month = (d.getMonth() + 1).toString().padStart(2, '0');
    
    return `${year}-${month}`;
  }

  addSkill(): void {
    this.skillsFormArray.push(this.fb.control(''));
  }

  removeSkill(index: number): void {
    this.skillsFormArray.removeAt(index);
  }

  addExperience(): void {
    this.experienceFormArray.push(this.fb.group({
      title: ['', Validators.required],
      company: ['', Validators.required],
      location: [''],
      startDate: ['', Validators.required],
      endDate: [''],
      current: [false],
      description: ['', Validators.required]
    }));
  }

  removeExperience(index: number): void {
    this.experienceFormArray.removeAt(index);
  }

  addEducation(): void {
    this.educationFormArray.push(this.fb.group({
      institution: ['', Validators.required],
      degree: ['', Validators.required],
      field: [''],
      location: [''],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      gpa: [''],
      description: ['']
    }));
  }

  removeEducation(index: number): void {
    this.educationFormArray.removeAt(index);
  }

  saveResume(): void {
    if (!this.resumeForm || this.resumeForm.invalid) {
      // Mark all fields as touched to trigger validation messages
      this.markFormGroupTouched(this.resumeForm!);
      return;
    }
    
    this.saving = true;
    const formValue = this.resumeForm.value;
    
    // Process dates from form values to proper format
    formValue.experience = formValue.experience.map((exp: any) => ({
      ...exp,
      startDate: exp.startDate,
      endDate: exp.current ? null : exp.endDate
    }));
    
    this.resumeService.updateResume(this.resumeId, formValue).subscribe({
      next: () => {
        this.saving = false;
        this.router.navigate(['/resumes', this.resumeId]);
      },
      error: (error) => {
        this.saving = false;
        console.error('Error updating resume:', error);
        alert('Failed to save changes. Please try again.');
      }
    });
  }

  markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      } else if (control instanceof FormArray) {
        control.controls.forEach(ctrl => {
          if (ctrl instanceof FormGroup) {
            this.markFormGroupTouched(ctrl);
          } else {
            ctrl.markAsTouched();
          }
        });
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/resumes', this.resumeId]);
  }
}