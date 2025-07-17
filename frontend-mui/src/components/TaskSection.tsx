import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Chip,
  Grow,
  TextField,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';

import TaskItem from './TaskItem';
import { Task, TaskStatus } from '../types/TaskTypes';

interface TaskSectionProps {
  title: string;
  tasks: Task[];
  status: TaskStatus;
  onTaskUpdate: (id: string, updates: Partial<Task>) => void;
  onAddTask: (text: string, status: TaskStatus) => void;
  color?: string;
  icon?: React.ReactNode;
}

const TaskSection: React.FC<TaskSectionProps> = ({
  title,
  tasks,
  status,
  onTaskUpdate,
  onAddTask,
  
  icon,
}) => {
  const [inputValue, setInputValue] = React.useState('');

  const getSectionColor = (status: TaskStatus) => {
    switch (status) {
      case 'pinned':
        return '#ff9800';
      case 'archived':
        return '#9e9e9e';
      default:
        return '#1976d2';
    }
  };

  const handleAddTask = () => {
    if (inputValue.trim()) {
      onAddTask(inputValue.trim(), status);
      setInputValue('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddTask();
    }
  };

  const sectionColor = getSectionColor(status);

  return (
    <Grow in timeout={500}>
      <Paper
        elevation={1}
        sx={{
          p: 3,
          mb: 3,
          borderRadius: 2,
          backgroundColor: '#fafafa',
          border: `2px solid ${sectionColor}20`,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            mb: 3,
            gap: 2,
          }}
        >
          {icon}
          <Typography
            variant="h5"
            sx={{
              fontWeight: 600,
              color: sectionColor,
              flexGrow: 1,
            }}
          >
            {title}
          </Typography>
          <Chip
            label={tasks.length}
            size="small"
            sx={{
              backgroundColor: sectionColor,
              color: 'white',
              fontWeight: 600,
            }}
          />
        </Box>

        <Box sx={{ mb: 3 }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder={`Add new task to ${title.toLowerCase()}...`}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            size="small"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleAddTask}
                    disabled={!inputValue.trim()}
                    size="small"
                    sx={{
                      color: sectionColor,
                      '&:hover': {
                        backgroundColor: `${sectionColor}20`,
                      },
                    }}
                  >
                    <AddIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                '&:hover fieldset': {
                  borderColor: sectionColor,
                },
                '&.Mui-focused fieldset': {
                  borderColor: sectionColor,
                },
              },
            }}
          />
        </Box>

        <Box sx={{ minHeight: '100px' }}>
          {tasks.length === 0 ? (
            <Box
              sx={{
                textAlign: 'center',
                py: 4,
                color: '#9e9e9e',
                fontStyle: 'italic',
              }}
            >
              No items in {title.toLowerCase()}
            </Box>
          ) : (
            tasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onUpdate={onTaskUpdate}
              />
            ))
          )}
        </Box>
      </Paper>
    </Grow>
  );
};

export default TaskSection;