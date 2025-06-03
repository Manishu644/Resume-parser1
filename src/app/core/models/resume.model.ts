export interface Resume {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  skills: string[];
  experience: Experience[];
  education: Education[];
  pdfUrl: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Experience {
  title: string;
  company: string;
  location: string;
  startDate: Date;
  endDate: Date;
  current: boolean;
  description: string;
  tools: string[];
}

export interface Education {
  institution: string;
  degree: string;
  field?: string;
  location?: string;
  startDate: Date | string;
  endDate?: Date | string;
  gpa?: number;
  description?: string;
}

export interface ResumeTemplate {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
}