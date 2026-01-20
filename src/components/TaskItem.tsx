import React from 'react';
import { type Task } from '../types';
import './TaskItem.css';

interface TaskItemProps {
    task: Task;
    onToggle: (id: string) => void;
    onDelete: (id: string) => void;
    onEdit: (id: string, text: string) => void;
}

export const TaskItem: React.FC<TaskItemProps> = ({ task, onToggle, onDelete, onEdit }) => {
    const handleEdit = () => {
        const newText = prompt('Edit task:', task.text);
        if (newText !== null && newText.trim() !== '') {
            onEdit(task.id, newText.trim());
        }
    };

    return (
        <div className={`task-item ${task.completed ? 'task-item-completed' : ''}`}>
            <div className="task-item-left">
                <label className="checkbox-container">
                    <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => onToggle(task.id)}
                    />
                    <span className="checkmark"></span>
                </label>
                <span className="task-text">{task.text}</span>
            </div>

            <div className="task-item-actions">
                <span className={`task-priority priority-${task.priority.toLowerCase()}`}>
                    {task.priority.toUpperCase()}
                </span>
                <button className="task-btn-edit" onClick={handleEdit}>
                    Edit
                </button>
                <button className="task-btn-delete" onClick={() => onDelete(task.id)}>
                    Delete
                </button>
            </div>
        </div>
    );
};
