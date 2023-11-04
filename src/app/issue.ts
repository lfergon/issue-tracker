export interface Issue {
  issueNumber: number;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  type: 'bug' | 'feature' | 'task';
  completedAt?: Date;
}
