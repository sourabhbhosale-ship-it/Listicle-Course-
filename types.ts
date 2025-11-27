import { ReactNode } from 'react';

export interface CourseSection {
  id: string;
  title: string;
  icon: ReactNode;
  content: ReactNode;
}
