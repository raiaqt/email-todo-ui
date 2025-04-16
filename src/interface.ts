export interface Task {
  deadline: string;
  detailed_tasks: string;
  from: string;
  subject: string;
  summary: string;
  checked: boolean;
  priority?: boolean;
  isNew?: boolean;
  prioritized?: boolean;
}
