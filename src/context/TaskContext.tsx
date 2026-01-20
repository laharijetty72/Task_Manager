import React, { createContext, useContext, useReducer, type ReactNode } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { type Task, type Priority } from '../types';

type TaskAction =
    | { type: 'ADD_TASK'; payload: { text: string; priority: Priority } }
    | { type: 'DELETE_TASK'; payload: { id: string } }
    | { type: 'TOGGLE_TASK'; payload: { id: string } }
    | { type: 'EDIT_TASK'; payload: { id: string; text: string } };

type TaskState = Task[];

const initialState: TaskState = [];

const taskReducer = (state: TaskState, action: TaskAction): TaskState => {
    switch (action.type) {
        case 'ADD_TASK': {
            const newTask: Task = {
                id: uuidv4(),
                text: action.payload.text,
                priority: action.payload.priority,
                completed: false,
                createdAt: Date.now(),
            };
            return [newTask, ...state];
        }
        case 'DELETE_TASK':
            return state.filter((task) => task.id !== action.payload.id);
        case 'TOGGLE_TASK':
            return state.map((task) =>
                task.id === action.payload.id ? { ...task, completed: !task.completed } : task
            );
        case 'EDIT_TASK':
            return state.map((task) =>
                task.id === action.payload.id ? { ...task, text: action.payload.text } : task
            );
        default:
            return state;
    }
};

interface TaskContextType {
    tasks: TaskState;
    dispatch: React.Dispatch<TaskAction>;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [tasks, dispatch] = useReducer(taskReducer, initialState);

    return (
        <TaskContext.Provider value={{ tasks, dispatch }}>
            {children}
        </TaskContext.Provider>
    );
};

export const useTasks = () => {
    const context = useContext(TaskContext);
    if (!context) {
        throw new Error('useTasks must be used within a TaskProvider');
    }
    return context;
};

