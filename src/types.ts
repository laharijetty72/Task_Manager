export type Priority = 'Low' | 'Medium' | 'High';

export interface Task {
    id: string;
    text: string;
    priority: Priority;
    completed: boolean;
    createdAt: number;
}
