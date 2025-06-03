import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="container">
      <section class="hero slide-up">
        <div class="hero-content">
          <h1>Transform Your Resume Experience</h1>
          <p class="hero-subtitle">Upload your PDF resume, edit extracted data, and generate professional templates in Word format.</p>
          <div class="hero-buttons">
            <a routerLink="/upload" class="btn btn-primary">Upload Resume</a>
            <a routerLink="/resumes" class="btn btn-secondary">View My Resumes</a>
          </div>
        </div>
        <div class="hero-image">
          <img src="https://images.pexels.com/photos/3759069/pexels-photo-3759069.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Resume illustration">
        </div>
      </section>

      <section class="features">
        <h2 class="section-title">How It Works</h2>
        <div class="feature-grid">
          <div class="feature-card fade-in">
            <div class="feature-icon">📄</div>
            <h3>Upload Your Resume</h3>
            <p>Upload your existing resume in PDF format.</p>
          </div>
          <div class="feature-card fade-in" style="animation-delay: 0.1s">
            <div class="feature-icon">🔍</div>
            <h3>Extract Data</h3>
            <p>Our system extracts your name, email, skills, experience, and education.</p>
          </div>
          <div class="feature-card fade-in" style="animation-delay: 0.2s">
            <div class="feature-icon">✏️</div>
            <h3>Edit Information</h3>
            <p>Review and edit the extracted information as needed.</p>
          </div>
          <div class="feature-card fade-in" style="animation-delay: 0.3s">
            <div class="feature-icon">🎨</div>
            <h3>Choose Templates</h3>
            <p>Select from multiple professional resume templates.</p>
          </div>
          <div class="feature-card fade-in" style="animation-delay: 0.4s">
            <div class="feature-icon">📝</div>
            <h3>Generate Documents</h3>
            <p>Generate Word documents based on your data and chosen template.</p>
          </div>
          <div class="feature-card fade-in" style="animation-delay: 0.5s">
            <div class="feature-icon">💼</div>
            <h3>Land Your Dream Job</h3>
            <p>Use your professionally formatted resume to impress employers.</p>
          </div>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .hero {
      display: flex;
      align-items: center;
      gap: var(--space-10);
      margin: var(--space-8) 0 var(--space-16);
    }
    
    .hero-content {
      flex: 1;
    }
    
    h1 {
      font-size: 2.5rem;
      margin-bottom: var(--space-4);
      color: var(--neutral-900);
    }
    
    .hero-subtitle {
      font-size: 1.25rem;
      color: var(--neutral-600);
      margin-bottom: var(--space-6);
      line-height: 1.5;
    }
    
    .hero-buttons {
      display: flex;
      gap: var(--space-4);
    }
    
    .hero-image {
      flex: 1;
      display: flex;
      justify-content: center;
    }
    
    .hero-image img {
      max-width: 100%;
      border-radius: var(--border-radius-lg);
      box-shadow: var(--shadow-lg);
    }
    
    .section-title {
      text-align: center;
      margin-bottom: var(--space-8);
      font-size: 2rem;
    }
    
    .feature-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: var(--space-6);
      margin-bottom: var(--space-12);
    }
    
    .feature-card {
      background-color: white;
      border-radius: var(--border-radius-md);
      padding: var(--space-6);
      box-shadow: var(--shadow-md);
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
    
    .feature-card:hover {
      transform: translateY(-5px);
      box-shadow: var(--shadow-lg);
    }
    
    .feature-icon {
      font-size: 2rem;
      margin-bottom: var(--space-4);
    }
    
    .feature-card h3 {
      margin-bottom: var(--space-2);
    }
    
    .feature-card p {
      color: var(--neutral-600);
    }
    
    @media (max-width: 1024px) {
      .feature-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }
    
    @media (max-width: 768px) {
      .hero {
        flex-direction: column;
      }
      
      .hero-image {
        order: -1;
        margin-bottom: var(--space-6);
      }
      
      .feature-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class HomeComponent {}