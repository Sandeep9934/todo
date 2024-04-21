import React from "react";
import {
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton
} from "@material-ui/core";
import { Delete as DeleteIcon, Edit as EditIcon } from "@material-ui/icons";

function TaskItem({ task, onDelete, onEdit }) {
  return (
    <ListItem>
      <ListItemText primary={task.text} />
      <ListItemSecondaryAction>
        <IconButton onClick={() => onEdit(task)}>
          <EditIcon />
        </IconButton>
        <IconButton onClick={() => onDelete(task.id)}>
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
}

export default TaskItem;
