import React, { useState, useRef } from 'react';
import { type Priority } from '../types';
import { useTasks } from '../context/TaskContext';
import './TaskInput.css';

export const TaskInput: React.FC = () => {
    const [text, setText] = useState('');
    const [priority, setPriority] = useState<Priority>('Medium');
    const { dispatch } = useTasks();
    const inputRef = useRef<HTMLInputElement>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (text.trim()) {
            dispatch({ type: 'ADD_TASK', payload: { text: text.trim(), priority } });
            setText('');
            setPriority('Medium');
            if (inputRef.current) {
                inputRef.current.focus();
            }
        }
    };

    return (
        <form className="task-input-container" onSubmit={handleSubmit}>
            <input
                ref={inputRef}
                type="text"
                className="task-input-field"
                placeholder="Add a new task..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                autoFocus
            />
            <div className="task-input-actions">
                <select
                    className="task-priority-select"
                    value={priority}
                    onChange={(e) => setPriority(e.target.value as Priority)}
                >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                </select>
                <button type="submit" className="task-add-button">
                    Add Task
                </button>
            </div>
        </form>
    );
};
