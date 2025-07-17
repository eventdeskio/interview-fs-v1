import { useState, useCallback, useMemo } from 'react';
import { Task, TaskSections } from '../types/TaskTypes';


export const useTaskManager = (initialTasks: Task[] = []) => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  const generateId = useCallback((): string => {
    return `task_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }, []);

  const addTask = useCallback((text: string = '') => {
    const newTask: Task = {
      id: generateId(),
      text,
      isPinned: false,
      isArchived: false,
      createdAt: new Date(),
    };

    setTasks(prev => [newTask, ...prev]);
    return newTask;
  }, [generateId]);

  const updateTask = useCallback((id: string, updates: Partial<Task>) => {
    setTasks(prev => 
      prev.map(task => 
        task.id === id ? { ...task, ...updates } : task
      )
    );
  }, []);

  const deleteTask = useCallback((id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  }, []);

  const toggleStar = useCallback((id: string) => {
    updateTask(id, { isPinned: !tasks.find(t => t.id === id)?.isPinned });
  }, [updateTask, tasks]);

  const toggleArchive = useCallback((id: string) => {
    updateTask(id, { isArchived: !tasks.find(t => t.id === id)?.isArchived });
  }, [updateTask, tasks]);

  const organizedTasks: TaskSections = useMemo(() => {
    const sections: TaskSections = {
      default: [],
      pinned: [],
      archived: [],
    };

    tasks.forEach(task => {
      if (task.isArchived) {
        sections.archived.push(task);
      } else if (task.isPinned) {
        sections.pinned.push(task);
      } else {
        sections.default.push(task);
      }
    });

    return sections;
  }, [tasks]);

  return {
    tasks,
    organizedTasks,
    addTask,
    updateTask,
    deleteTask,
    toggleStar,
    toggleArchive,
  };
};