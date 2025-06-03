import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  template: `
    <nav class="navbar">
      <div class="container navbar-container">
        <a routerLink="/" class="navbar-brand">Resume Parser & Generator</a>
        <div class="navbar-links">
          <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">Home</a>
          <a routerLink="/upload" routerLinkActive="active">Upload Resume</a>
          <a routerLink="/resumes" routerLinkActive="active">My Resumes</a>
        </div>
      </div>
    </nav>
  `,
  styles: [`
    .navbar {
      background-color: white;
      box-shadow: var(--shadow-sm);
      position: sticky;
      top: 0;
      z-index: 100;
    }
    
    .navbar-container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: var(--space-4) 0;
    }
    
    .navbar-brand {
      font-size: 1.25rem;
      font-weight: 600;
      color: var(--primary-700);
    }
    
    .navbar-links {
      display: flex;
      gap: var(--space-6);
    }
    
    .navbar-links a {
      color: var(--neutral-600);
      font-weight: 500;
      padding-bottom: var(--space-1);
      border-bottom: 2px solid transparent;
      transition: all 0.2s ease;
    }
    
    .navbar-links a:hover {
      color: var(--primary-600);
      text-decoration: none;
    }
    
    .navbar-links a.active {
      color: var(--primary-600);
      border-bottom-color: var(--primary-600);
    }
    
    @media (max-width: 768px) {
      .navbar-container {
        flex-direction: column;
        align-items: flex-start;
        gap: var(--space-3);
      }
      
      .navbar-links {
        width: 100%;
        gap: var(--space-4);
      }
    }
  `]
})
export class NavbarComponent {}