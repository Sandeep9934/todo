import React, { useState } from "react";
import { TextField, Button, Grid } from "@material-ui/core";

function TaskForm({ addTask }) {
  const [taskText, setTaskText] = useState("");

  const handleAddTask = () => {
    if (taskText.trim() !== "") {
      addTask(taskText);
      setTaskText("");
    }
  };

  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item xs={8}>
        <TextField
          label="Add Task"
          fullWidth
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
        />
      </Grid>
      <Grid item xs={4}>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleAddTask}
        >
          Add
        </Button>
      </Grid>
    </Grid>
  );
}

export default TaskForm;
