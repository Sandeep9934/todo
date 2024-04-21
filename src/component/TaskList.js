import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton
} from "@material-ui/core";
import { Delete as DeleteIcon, Edit as EditIcon } from "@material-ui/icons";

function TaskList({ tasks, deleteTask, editTask }) {
  return (
    <List>
      {tasks.map((task) => (
        <ListItem key={task.id}>
          <ListItemText primary={task.text} />
          <ListItemSecondaryAction>
            <IconButton onClick={() => editTask(task)}>
              <EditIcon />
            </IconButton>
            <IconButton onClick={() => deleteTask(task.id)}>
              <DeleteIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      ))}
    </List>
  );
}

export default TaskList;
