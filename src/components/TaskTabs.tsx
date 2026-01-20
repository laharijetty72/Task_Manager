import React from 'react';
import './TaskTabs.css';

export type Tab = 'all' | 'active' | 'completed';

interface TaskTabsProps {
    activeTab: Tab;
    onTabChange: (tab: Tab) => void;
    counts: {
        all: number;
        active: number;
        completed: number;
    };
}

export const TaskTabs: React.FC<TaskTabsProps> = ({ activeTab, onTabChange, counts }) => {
    return (
        <div className="task-tabs-container">
            <div className="task-tabs">
                {(['all', 'active', 'completed'] as Tab[]).map((tab) => (
                    <button
                        key={tab}
                        className={`task-tab ${activeTab === tab ? 'task-tab-active' : ''}`}
                        onClick={() => onTabChange(tab)}
                    >
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                ))}
            </div>
            <div className="task-counts">
                <span>Total: {counts.all}</span>
                <span>Active: {counts.active}</span>
                <span>Completed: {counts.completed}</span>
            </div>
        </div>
    );
};
