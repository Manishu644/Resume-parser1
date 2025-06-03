import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <footer class="footer">
      <div class="container">
        <div class="footer-content">
          <p>&copy; {{ currentYear }} Resume Parser & Generator. All rights reserved.</p>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    .footer {
      background-color: var(--neutral-100);
      padding: var(--space-6) 0;
      margin-top: auto;
    }
    
    .footer-content {
      display: flex;
      justify-content: center;
      color: var(--neutral-600);
    }
  `]
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
}