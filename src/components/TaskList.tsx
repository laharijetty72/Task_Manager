import React from 'react';
import { type Task } from '../types';
import { TaskItem } from './TaskItem';
import { useTasks } from '../context/TaskContext';

interface TaskListProps {
    tasks: Task[];
}

export const TaskList: React.FC<TaskListProps> = ({ tasks }) => {
    const { dispatch } = useTasks();

    if (tasks.length === 0) {
        return (
            <div style={{ textAlign: 'center', padding: '40px', color: 'var(--color-text-secondary)' }}>
                No tasks found.
            </div>
        );
    }

    return (
        <div className="task-list">
            {tasks.map((task) => (
                <TaskItem
                    key={task.id}
                    task={task}
                    onToggle={(id) => dispatch({ type: 'TOGGLE_TASK', payload: { id } })}
                    onDelete={(id) => dispatch({ type: 'DELETE_TASK', payload: { id } })}
                    onEdit={(id, text) => dispatch({ type: 'EDIT_TASK', payload: { id, text } })}
                />
            ))}
        </div>
    );
};
