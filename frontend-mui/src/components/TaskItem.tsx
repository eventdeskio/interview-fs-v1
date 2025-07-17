import React, { useState } from 'react';
import {
  Box,
  Checkbox,
  IconButton,
  TextField,
  Paper,
  Fade,
} from '@mui/material';
import { Star, StarBorder } from '@mui/icons-material';
import { Task } from '../types/TaskTypes';


interface TaskItemProps {
  task: Task;
  onUpdate: (id: string, updates: Partial<Task>) => void;
  onDelete?: (id: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onUpdate }) => {
    
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);

  const handleTextUpdate = () => {
    if (editText.trim() && editText !== task.text) {
      onUpdate(task.id, { text: editText.trim() });
    }
    setIsEditing(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleTextUpdate();
    } else if (e.key === 'Escape') {
      setEditText(task.text);
      setIsEditing(false);
    }
  };

  const handleStarToggle = () => {
    onUpdate(task.id, { isPinned: !task.isPinned });
  };

  const handleArchiveToggle = () => {
    onUpdate(task.id, { isArchived: !task.isArchived });
  };

  return (
    <Fade in timeout={300}>
      <Paper
        elevation={2}
        sx={{
          p: 2,
          mb: 2,
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            elevation: 4,
            transform: 'translateY(-1px)',
          },
        }}
      >
        <Checkbox
          checked={task.isArchived}
          onChange={handleArchiveToggle}
          color="primary"
          sx={{
            '&.Mui-checked': {
              color: '#ff9800',
            },
          }}
        />
        
        <Box sx={{ flexGrow: 1 }}>
          {isEditing ? (
            <TextField
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              onBlur={handleTextUpdate}
              onKeyDown={handleKeyPress}
              fullWidth
              variant="standard"
              autoFocus
              sx={{
                '& .MuiInput-underline:before': {
                  borderBottomColor: '#e0e0e0',
                },
              }}
            />
          ) : (
            <Box
              onClick={() => setIsEditing(true)}
              sx={{
                cursor: 'text',
                p: 1,
                borderRadius: 1,
                minHeight: '24px',
                '&:hover': {
                  backgroundColor: '#f5f5f5',
                },
                textDecoration: task.isArchived ? 'line-through' : 'none',
                opacity: task.isArchived ? 0.7 : 1,
                fontSize: '16px',
                fontWeight: task.isPinned ? 500 : 400,
              }}
            >
              {task.text || 'Click to add text...'}
            </Box>
          )}
        </Box>

        <IconButton
          onClick={handleStarToggle}
          color={task.isPinned ? 'warning' : 'default'}
          sx={{
            transition: 'all 0.2s ease-in-out',
            '&:hover': {
              transform: 'scale(1.1)',
            },
          }}
        >
            
          {!task?.isArchived &&(task.isPinned ? <Star /> : <StarBorder />)}
        </IconButton>
      </Paper>
    </Fade>
  );
};

export default TaskItem;