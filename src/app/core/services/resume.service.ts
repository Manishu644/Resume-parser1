import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Resume } from '../models/resume.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ResumeService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  uploadResume(file: File): Observable<Resume> {
    const formData = new FormData();
    formData.append('resume', file);
    
    return this.http.post<Resume>(`${this.apiUrl}/resumes/upload`, formData)
      .pipe(
        map(resume => ({
          ...resume,
          pdfUrl: resume.pdfUrl.startsWith('http') ? resume.pdfUrl : `${this.apiUrl}${resume.pdfUrl}`
        }))
      );
  }

  getResumes(): Observable<Resume[]> {
    return this.http.get<Resume[]>(`${this.apiUrl}/resumes`);
  }

  getResumeById(id: string): Observable<Resume> {
    return this.http.get<Resume>(`${this.apiUrl}/resumes/${id}`)
      .pipe(
        map(resume => ({
          ...resume,
          pdfUrl: resume.pdfUrl.startsWith('http') ? resume.pdfUrl : `${this.apiUrl}${resume.pdfUrl}`
        }))
      );
  }

  updateResume(id: string, resume: Partial<Resume>): Observable<Resume> {
    return this.http.put<Resume>(`${this.apiUrl}/resumes/${id}`, resume);
  }

  deleteResume(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/resumes/${id}`);
  }

  generateResume(id: string, templateId: string): Observable<{ downloadUrl: string }> {
    return this.http.post<{ downloadUrl: string }>(`${this.apiUrl}/resumes/${id}/generate`, { templateId })
      .pipe(
        map(response => ({
          downloadUrl: response.downloadUrl.replace(/^\/api/, this.apiUrl)
        }))
      );
  }

  downloadGeneratedResume(downloadUrl: string): Observable<Blob> {
    if (downloadUrl.startsWith('/api')) {
      downloadUrl = downloadUrl.replace(/^\/api/, this.apiUrl);
    }

    return this.http.get(downloadUrl, {
      responseType: 'blob',
      headers: {
        'Accept': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      },
      observe: 'response'
    }).pipe(
      map(response => {
        const contentType = response.headers.get('Content-Type');
        const blob = response.body;
        
        if (!blob) {
          throw new Error('No data received');
        }
        
        if (!contentType?.includes('application/vnd.openxmlformats-officedocument.wordprocessingml.document')) {
          console.warn('Unexpected content type:', contentType);
        }
        
        console.log('Response received:', {
          contentType,
          blobSize: blob.size,
          headers: response.headers.keys()
        });
        
        return blob;
      })
    );
  }

  getAllResumes(): Observable<Resume[]> {
    return this.http.get<Resume[]>(`${this.apiUrl}/resumes`)
      .pipe(
        map(resumes => resumes.map(resume => ({
          ...resume,
          pdfUrl: resume.pdfUrl.startsWith('http') ? resume.pdfUrl : `${this.apiUrl}${resume.pdfUrl}`
        })))
      );
  }
}