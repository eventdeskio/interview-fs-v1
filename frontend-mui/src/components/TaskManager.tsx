import React, { useState, useCallback } from 'react';
import {
  Box,
  Container,
  Typography,
  Snackbar,
  Alert,
} from '@mui/material';

import {
  Inbox as InboxIcon,
  Star as StarIcon,
  Archive as ArchiveIcon,
} from '@mui/icons-material';
import { Task, TaskSections, TaskStatus } from '../types/TaskTypes';
import TaskSection from './TaskSection';



const TaskManager: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: 'success' | 'info' | 'warning' | 'error';
  }>({
    open: false,
    message: '',
    severity: 'info',
  });

  
  const generateId = (): string => {
    return `task_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  };

  
  const addNewTask = useCallback((text: string, status: TaskStatus) => {
    const newTask: Task = {
      id: generateId(),
      text,
      isPinned: status === 'pinned',
      isArchived: status === 'archived',
      createdAt: new Date(),
      
    };

    setTasks(prev => [newTask, ...prev]);
    setSnackbar({
      open: true,
      message: `Task added to ${status === 'default' ? 'default' : status} section!`,
      severity: 'success',
    });
  }, []);

 
  const updateTask = useCallback((id: string, updates: Partial<Task>) => {
    setTasks(prev => 
      prev.map(task => 
        task.id === id ? { ...task, ...updates } : task
      )
    );

    
    if (updates.isPinned !== undefined) {
      setSnackbar({
        open: true,
        message: updates.isPinned ? 'Task pinned!' : 'Task unstarred!',
        severity: 'info',
      });
    } else if (updates.isArchived !== undefined) {
      setSnackbar({
        open: true,
        message: updates.isArchived ? 'Task archived!' : 'Task unarchived!',
        severity: 'info',
      });
    }
  }, []);

  
  const organizedTasks: TaskSections = React.useMemo(() => {
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

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <Typography
          variant="h3"
          component="h1"
          sx={{
            fontWeight: 700,
            background: 'linear-gradient(45deg, #1976d2, #ff9800)',
            backgroundClip: 'text',
            mb: 2,
          }}
        >
          Task Manager
        </Typography>
        <Typography
          variant="h6"
          color="text.secondary"
          sx={{ mb: 4 }}
        >
          Organize your tasks efficiently
        </Typography>
      </Box>

      <Box
        sx={{
          display: 'flex',
            flexDirection: 'column',
          gap: 3,
          gridTemplateColumns: {
            xs: '1fr',
            md: 'repeat(auto-fit, minmax(400px, 1fr))',
          },
        }}
      >
        <TaskSection
          title="Default Tasks"
          tasks={organizedTasks.default}
          status="default"
          onTaskUpdate={updateTask}
          onAddTask={addNewTask}
          icon={<InboxIcon sx={{ color: '#1976d2' }} />}
        />

        <TaskSection
          title="Pinned Tasks"
          tasks={organizedTasks.pinned}
          status="pinned"
          onTaskUpdate={updateTask}
          onAddTask={addNewTask}
          icon={<StarIcon sx={{ color: '#ff9800' }} />}
        />

        <TaskSection
          title="Archived Tasks"
          tasks={organizedTasks.archived}
          status="archived"
          onTaskUpdate={updateTask}
          onAddTask={addNewTask}
          icon={<ArchiveIcon sx={{ color: '#9e9e9e' }} />}
        />
      </Box>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          variant="filled"
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default TaskManager;